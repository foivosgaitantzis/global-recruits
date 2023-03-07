import { PoolClient } from "pg";
import { getPostgresConnection } from "../data_access/database/connect";
import { beginPostgresTransaction, commitPostgresTransaction, rollbackPostgresTransaction } from "../data_access/database/utils";
import { AthleteRepository } from "../data_access/modules/Athlete";
import { AthleteTeam, AthleteTeamRepository } from "../data_access/modules/AthleteTeam";
import { AthleteTeamYear, AthleteTeamYearRepository } from "../data_access/modules/AthleteTeamYear";
import { Highlights, HighlightsRepository } from "../data_access/modules/Highlights";
import { StaffRepository } from "../data_access/modules/Staff";
import { TeamRepository } from "../data_access/modules/Team";
import { UserRepository } from "../data_access/modules/User";
import { ForbiddenError, NotFoundError, PostgresError } from "../errors/CustomErrors";
import { mapAthleteDetails, mapStaffDetails } from "../maps/getMemberDetails.map";
import { AthleteTeamDetails, StaffTeamDetails } from "../models/getMemberDetails";
import { GetAthleteDetailsResponse, GetStaffDetailsResponse, MemberType, PositionType, TeamType } from "../models/GlobalRecruits";
import { getUserRole } from "../validation/bearerToken";

/**
 * Initialize Database Repositories
 */
const userRepository = new UserRepository();
const athleteRepository = new AthleteRepository();
const teamRepository = new TeamRepository();
const athleteTeamRepository = new AthleteTeamRepository();
const athleteTeamYearRepository = new AthleteTeamYearRepository();
const highlightRepository = new HighlightsRepository();
const staffRepository = new StaffRepository();

/**
 * Get Member Details Function
 * @param oauthSub The OAuthSub of the User to Fetch
 * @param userId (Alternatively) The User ID of the User to Fetch
 */
export async function getMemberDetails(
    oauthSub?: string,
    userId?: string
): Promise<GetAthleteDetailsResponse | GetStaffDetailsResponse> {
    const tx = await getPostgresConnection();
    try {
        let role: MemberType;
        if (userId && oauthSub) {
            role = await getUserRole(tx, oauthSub);
            if (!role || !(role === MemberType.Staff || role === MemberType.Administrator)) {
                throw new ForbiddenError("Only Administrators & Staff are Allowed to View Member Information");
            }
        }
        const searchUsers = await userRepository.find({
            oauthSub: userId ? undefined : oauthSub,
            userId: userId
        }, { tx });
        const user = searchUsers[0];
        if (!(searchUsers.length > 0 && user)) {
            throw new NotFoundError("No user was found with that OAuthSub")
        }
        if (user.userType === MemberType.Athlete) {
            const athleteSearch = await athleteRepository.find({
                userId: user.userId
            }, { tx });
            const athlete = athleteSearch[0];
            let athleteTeams: AthleteTeamDetails[] = [];
            let highlights: Highlights[] = [];
            if (athlete) {
                athleteTeams = await unpackAthleteTeamDetails(tx, athlete.athleteId);
                highlights = await highlightRepository.find({
                    athleteId: athlete.athleteId
                }, { tx });
            }
            return mapAthleteDetails(user, athlete, athleteTeams, highlights);
        } else if (user.userType === MemberType.Staff) {
            if (role && role !== MemberType.Administrator) {
                throw new ForbiddenError("Only Administrators are Allowed to View Staff Information");
            }
            const staffSearch = await staffRepository.find({
                userId: user.userId
            }, { tx });
            const staff = staffSearch[0];
            let staffTeam: StaffTeamDetails = undefined;
            if (staff) {
                staffTeam = await unpackStaffTeamDetails(tx, staff.teamId, staff.teamPosition);
            }
            return mapStaffDetails(user, staffTeam);
        }
    } catch (error: any) {
        if (error instanceof NotFoundError || error instanceof ForbiddenError) {
            throw error;
        }
        throw new PostgresError(error.message);
    } finally {
        tx.release();
    }
}

/**
 * Function that Unpacks Athlete Team Details
 * @param tx 
 * @param athleteId 
 * @returns 
 */
async function unpackAthleteTeamDetails(
    tx: PoolClient,
    athleteId: string
): Promise<AthleteTeamDetails[]> {
    const athleteTeamSearch = await athleteTeamRepository.find({
        athleteId
    }, { tx });
    return await Promise.all(athleteTeamSearch.map(async (athleteTeam) => {
        const teamSearch = await teamRepository.find({
            teamId: athleteTeam.teamId
        });
        const teamDetails = teamSearch?.[0];
        const teamYears = await athleteTeamYearRepository.find({
            athleteTeamId: athleteTeam.athleteTeamId
        });
        if (teamDetails) {
            return {
                id: athleteTeam.athleteTeamId,
                data: {
                    type: teamDetails.teamType as TeamType,
                    name: teamDetails.teamName,
                    country: teamDetails.country,
                    city: teamDetails.city,
                    school: teamDetails.school,
                    position: athleteTeam.teamPosition as PositionType,
                    years: teamYears?.map((teamYear) => ({
                        id: teamYear.athleteTeamYearId,
                        data: {
                            year: teamYear.year,
                            stats: {
                                avgPpg: teamYear.avgPpg,
                                avgApg: teamYear.avgApg,
                                avgRpg: teamYear.avgRpg
                            }
                        }
                    }))
                }
            }
        }
    }));
}

async function unpackStaffTeamDetails(
    tx: PoolClient,
    teamId?: string,
    position?: string
): Promise<StaffTeamDetails> {
    const teamSearch = await teamRepository.find({
        teamId: teamId
    });
    const team = teamSearch?.[0];
    if (team) {
        return {
            type: team.teamType as TeamType,
            name: team.teamName,
            country: team.country,
            city: team.city,
            school: team.school,
            position
        }
    }
}