import { PoolClient } from "pg";
import { getPostgresConnection } from "../data_access/database/connect";
import { AthleteRepository } from "../data_access/modules/Athlete";
import { AthleteTeamRepository } from "../data_access/modules/AthleteTeam";
import { AthleteTeamYearRepository } from "../data_access/modules/AthleteTeamYear";
import { Highlight, HighlightRepository } from "../data_access/modules/Highlight";
import { StaffRepository } from "../data_access/modules/Staff";
import { TeamRepository } from "../data_access/modules/Team";
import { UserRepository } from "../data_access/modules/User";
import { ForbiddenError, NotFoundError, PostgresError } from "../errors/CustomErrors";
import { mapAthleteDetails, mapStaffDetails } from "../maps/getMemberDetails.map";
import { AthleteTeamDetails, StaffTeamDetails } from "../models/getMemberDetails";
import { CollegeSubType, GetAthleteDetailsResponse, GetStaffDetailsResponse, MemberType, PositionType, TeamType } from "../models/GlobalRecruits";
import { getMemberAccess } from "../validation/bearerToken";

/**
 * Initialize Database Repositories
 */
const userRepository = new UserRepository();
const athleteRepository = new AthleteRepository();
const teamRepository = new TeamRepository();
const athleteTeamRepository = new AthleteTeamRepository();
const athleteTeamYearRepository = new AthleteTeamYearRepository();
const highlightRepository = new HighlightRepository();
const staffRepository = new StaffRepository();

/**
 * Get Member Details Function
 * @param oauthSub The OAuthSub of the User to Fetch
 * @param userId (Alternatively) The User ID of the User to Fetch
 */
export async function getMemberDetails(
    oauthSub: string,
    userId: string
): Promise<GetAthleteDetailsResponse | GetStaffDetailsResponse> {
    const tx = await getPostgresConnection();
    try {
        const searchUserId = await getMemberAccess(tx, oauthSub, userId, [MemberType.Administrator, MemberType.Staff]);
        const searchUsers = await userRepository.find({
            userId: searchUserId
        }, { tx });
        const user = searchUsers[0];
        if (!(searchUsers.length > 0 && user)) {
            throw new NotFoundError("No user was found with that " + (userId ? "User ID" : "OAuthSub"));
        }
        if (user.type === MemberType.Athlete) {
            const athleteSearch = await athleteRepository.find({
                userId: user.userId
            }, { tx });
            const athlete = athleteSearch[0];
            let athleteTeams: AthleteTeamDetails[] = [];
            let highlights: Highlight[] = [];
            if (athlete) {
                athleteTeams = await unpackAthleteTeamDetails(tx, athlete.athleteId);
                highlights = await highlightRepository.find({
                    athleteId: athlete.athleteId
                }, { tx });
            }
            return mapAthleteDetails(user, athlete, athleteTeams, highlights);
        } else if (user.type === MemberType.Staff) {
            await getMemberAccess(tx, oauthSub, userId, [MemberType.Administrator]);
            const staffSearch = await staffRepository.find({
                userId: user.userId
            }, { tx });
            const staff = staffSearch[0];
            let staffTeam: StaffTeamDetails = undefined;
            if (staff) {
                staffTeam = await unpackStaffTeamDetails(tx, staff.teamId, staff.position);
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
 * @param tx The Transaction Pool Client  
 * @param athleteId The Athlete ID (Primary Key of Athletes)
 * @returns Athlete Team Details Model 
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
        }, { tx });
        const teamDetails = teamSearch?.[0];
        const teamYears = await athleteTeamYearRepository.find({
            athleteTeamId: athleteTeam.athleteTeamId
        }, { tx });
        if (teamDetails) {
            return {
                id: athleteTeam.athleteTeamId,
                data: {
                    type: teamDetails.type as TeamType,
                    subType: teamDetails.subType as CollegeSubType,
                    division: teamDetails.division,
                    name: teamDetails.name,
                    country: teamDetails.country,
                    city: teamDetails.city,
                    school: teamDetails.school,
                    position: athleteTeam.position as PositionType,
                    classOf: athleteTeam.classOf,
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

/**
 * 
 * @param tx The Transaction Pool Client   
 * @param teamId The Team ID (Primary Key of Teams)
 * @param position The Player Position
 * @returns The Unpacked Staff Team Details
 */
async function unpackStaffTeamDetails(
    tx: PoolClient,
    teamId?: string,
    position?: string
): Promise<StaffTeamDetails> {
    const teamSearch = await teamRepository.find({
        teamId: teamId
    }, { tx });
    const team = teamSearch?.[0];
    if (team) {
        return {
            type: team.type as TeamType,
            subType: team.subType as CollegeSubType,
            division: team.division,
            name: team.name,
            country: team.country,
            city: team.city,
            school: team.school,
            position
        }
    }
}