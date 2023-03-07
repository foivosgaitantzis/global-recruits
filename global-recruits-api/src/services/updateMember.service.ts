import { PoolClient } from "pg";
import { getPostgresConnection } from "../data_access/database/connect";
import { beginPostgresTransaction, commitPostgresTransaction, rollbackPostgresTransaction } from "../data_access/database/utils";
import { Athlete, AthleteRepository } from "../data_access/modules/Athlete";
import { AthleteTeamRepository } from "../data_access/modules/AthleteTeam";
import { AthleteTeamYearRepository } from "../data_access/modules/AthleteTeamYear";
import { HighlightsRepository } from "../data_access/modules/Highlights";
import { Staff, StaffRepository } from "../data_access/modules/Staff";
import { Team, TeamRepository } from "../data_access/modules/Team";
import { UserRepository } from "../data_access/modules/User";
import { ForbiddenError, NotFoundError, PostgresError, ValidationError } from "../errors/CustomErrors";
import { isUndefined } from "../helpers/helper";
import { ActionType, MemberType, TeamType, UpdateAthleteDetailsRequestBody, UpdateStaffDetailsRequestBody } from "../models/GlobalRecruits";
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
 * Update Member Details Function
 * @param oauthSub The OAuthSub of the User to Update
 * @param requestBody The New Data to Update With
 */
export async function updateMemberDetails(
    requestBody: UpdateAthleteDetailsRequestBody | UpdateStaffDetailsRequestBody,
    oauthSub?: string,
    userId?: string
) {
    const tx = await getPostgresConnection();
    try {
        let role: MemberType;
        if (userId && oauthSub) {
            role = await getUserRole(tx, oauthSub);
            if (!role || !(role === MemberType.Administrator)) {
                throw new ForbiddenError("Only Administrators are Allowed to Update Member Information");
            }
        }
        await beginPostgresTransaction(tx);
        const searchUsers = await userRepository.find({
            oauthSub: userId ? undefined : oauthSub,
            userId: userId
        }, { tx });
        const user = searchUsers[0];
        if (!(searchUsers.length > 0 && user)) {
            throw new NotFoundError("No user was found with that OAuthSub")
        }
        if (user.userType !== requestBody.type) {
            throw new ValidationError("Your User does NOT belong in the Category of '" + requestBody.type + "'");
        }
        await updateBasicDetails(tx, user.userId, requestBody);
        if (user.userType === MemberType.Athlete) {
            const athlete = await updateAthleteDetails(tx, user.userId, requestBody as UpdateAthleteDetailsRequestBody);
            await updateAthleteTeamDetails(tx, athlete.athleteId, requestBody as UpdateAthleteDetailsRequestBody);
            await updateAthleteHighlights(tx, athlete.athleteId, requestBody as UpdateAthleteDetailsRequestBody);
        } else if (user.userType === MemberType.Staff) {
            await updateStaffDetails(tx, user.userId, requestBody as UpdateStaffDetailsRequestBody);
        }
        await commitPostgresTransaction(tx);
    } catch (error: any) {
        await rollbackPostgresTransaction(tx);
        if (error instanceof ValidationError || error instanceof NotFoundError || error instanceof ForbiddenError) {
            throw error;
        }
        throw new PostgresError(error.message);
    } finally {
        tx.release();
    }
}

/**
 * Updates a User's Basic Details (First Name, Last Name)
 * @param tx The Transaction Pool Client  
 * @param userId The User ID (Primary Key of Users) to Update
 * @param requestBody New Data to Update With
 */
async function updateBasicDetails(
    tx: PoolClient,
    userId: string,
    requestBody: UpdateAthleteDetailsRequestBody | UpdateStaffDetailsRequestBody
) {
    await userRepository.update(userId, {
        firstName: requestBody.data.firstName,
        lastName: requestBody.data.lastName
    }, tx);
}

/**
 * Updates an Athlete's Details (ex. dateOfBirth, country, etc.)
 * @param tx The Transaction Pool Client
 * @param userId The User ID (Primary Key of Users) to Update
 * @param requestBody New Data to Update With
 */
async function updateAthleteDetails(
    tx: PoolClient,
    userId: string,
    requestBody: UpdateAthleteDetailsRequestBody
) {
    const athletes = await athleteRepository.find({
        userId,
    }, { tx });
    let athlete: Athlete;
    if (athletes.length > 0) {
        athlete = athletes[0];
        await athleteRepository.update(athlete.athleteId, {
            dateOfBirth: requestBody.data.dateOfBirth,
            country: requestBody.data.country,
            city: requestBody.data.city,
            weight: requestBody.data.weight?.value,
            weightUnit: requestBody.data.weight?.unit,
            height: requestBody.data.height?.value,
            heightUnit: requestBody.data.height?.unit
        }, tx);
    } else {
        if (requestBody.data.dateOfBirth && requestBody.data.country
            && requestBody.data.city && requestBody.data.weight
            && requestBody.data.height) {
            athlete = await athleteRepository.create({
                userId,
                dateOfBirth: requestBody.data.dateOfBirth,
                country: requestBody.data.country,
                city: requestBody.data.city,
                weight: requestBody.data.weight?.value,
                weightUnit: requestBody.data.weight?.unit,
                height: requestBody.data.height?.value,
                heightUnit: requestBody.data.height?.unit
            }, tx);
        } else {
            throw new ValidationError("All Athlete Basic Details are Required for Initial Onboarding")
        }
    }
    return athlete;
}

/**
 * Utility Function (Extra Long) that Adds/Updates/Deletes Athlete Teams & Years
 * @param tx The Transaction Pool Client
 * @param athleteId The Athlete ID (Primary Key of Athlete) to Update
 * @param requestBody New Data to Update With
 */
async function updateAthleteTeamDetails(
    tx: PoolClient,
    athleteId: string,
    requestBody: UpdateAthleteDetailsRequestBody
) {
    if (requestBody.data.team) {
        // Loop through each AthleteTeam Object
        for (const team of requestBody.data.team) {
            switch (team.action) {
                // Handle Addition of New AthleteTeam
                case ActionType.Add:
                    if (team.data?.name && team.data?.position &&
                        team.data?.type) {
                        if (team.data.years && team.data.years.length > 0) {
                            const teamEntity = await createOrReuseTeam(tx, team.data.name, team.data.type, team.data.country, team.data.city, team.data.school);
                            const athleteTeamEntity = await athleteTeamRepository.create({
                                athleteId,
                                teamId: teamEntity.teamId,
                                teamPosition: team.data.position
                            }, tx);
                            for (const year of team.data.years) {
                                if (year.action !== ActionType.Add) {
                                    throw new ValidationError("You can only 'Add' Yearly Data to a New Team");
                                }
                                if (year.data?.year && year.data?.stats?.avgPpg && year.data?.stats?.avgApg && year.data?.stats?.avgRpg) {
                                    await athleteTeamYearRepository.create({
                                        athleteTeamId: athleteTeamEntity.athleteTeamId,
                                        year: year.data.year,
                                        avgPpg: year.data.stats.avgPpg,
                                        avgApg: year.data.stats.avgApg,
                                        avgRpg: year.data.stats.avgRpg
                                    }, tx);
                                } else {
                                    throw new ValidationError("All Athlete Yearly Data are required for 'Addition'");
                                }
                            }
                        } else {
                            throw new ValidationError("At least one Year of Data is required for 'Addition'");
                        }
                    } else {
                        throw new ValidationError("All Team Details are required for 'Addition'");
                    }
                    break;
                // Handle Editing of an Existing AthleteTeam
                case ActionType.Edit:
                    if (team.id) {
                        const athleteTeamEntity = await athleteTeamRepository.findOne(team.id, { tx });
                        if (athleteTeamEntity) {
                            let newTeam: Team;
                            if (team.data?.name || team.data?.type || !isUndefined(team.data?.country) || !isUndefined(team.data?.city) || !isUndefined(team.data?.school)) {
                                const oldTeam = await teamRepository.findOne(athleteTeamEntity.teamId, { tx });
                                newTeam = await createOrReuseTeam(
                                    tx,
                                    team.data.name ?? oldTeam.teamName,
                                    team.data.type ?? oldTeam.teamType as TeamType,
                                    isUndefined(team.data.country) ? oldTeam.country : team.data.country,
                                    isUndefined(team.data.city) ? oldTeam.city : team.data.city,
                                    isUndefined(team.data.school) ? oldTeam.school : team.data.school
                                );
                            }
                            await athleteTeamRepository.update(team.id, {
                                athleteId,
                                teamId: newTeam?.teamId,
                                teamPosition: team.data.position
                            }, tx);
                            if (newTeam) {
                                await safeDeleteTeam(tx, athleteTeamEntity.teamId);
                            }
                            if (team.data.years && team.data.years.length > 0) {
                                for (const year of team.data.years) {
                                    switch (year.action) {
                                        // Handle Addition of a New AthleteTeamYear
                                        case ActionType.Add:
                                            if (year.data.year && year.data.stats?.avgPpg && year.data.stats?.avgApg && year.data.stats?.avgRpg) {
                                                await athleteTeamYearRepository.create({
                                                    athleteTeamId: athleteTeamEntity.athleteTeamId,
                                                    year: year.data.year,
                                                    avgPpg: year.data.stats.avgPpg,
                                                    avgApg: year.data.stats.avgApg,
                                                    avgRpg: year.data.stats.avgRpg
                                                }, tx);
                                            } else {
                                                throw new ValidationError("All Athlete Team Data are required for 'Addition'");
                                            }
                                            break;
                                        // Handle Editing of an Existing AthleteTeamYear
                                        case ActionType.Edit:
                                            if (year.id) {
                                                const athleteTeamYearEntity = await athleteTeamYearRepository.findOne(year.id, { tx });
                                                if (athleteTeamYearEntity) {
                                                    await athleteTeamYearRepository.update(year.id, {
                                                        year: year.data?.year,
                                                        avgPpg: year.data?.stats?.avgPpg,
                                                        avgApg: year.data?.stats?.avgApg,
                                                        avgRpg: year.data?.stats?.avgRpg
                                                    }, tx);
                                                } else {
                                                    throw new NotFoundError("Could NOT Find the Athlete Team Year ID: " + year.id);
                                                }
                                            } else {
                                                throw new ValidationError("An Athlete Team Year ID is Required for an Edit Operation")
                                            }
                                            break;
                                        // Handle Deletion of an Existing AthleteTeamYear
                                        case ActionType.Delete:
                                            if (year.id) {
                                                const athleteTeamYearEntity = await athleteTeamYearRepository.findOne(year.id, { tx });
                                                if (athleteTeamYearEntity) {
                                                    const athleteTeamYearEntities = await athleteTeamYearRepository.find({
                                                        athleteTeamId: team.id
                                                    }, { tx });
                                                    if (athleteTeamYearEntities.length <= 1
                                                        && !team.data.years.find((athleteTeamYears) => athleteTeamYears.action === 'add')) {
                                                        throw new ValidationError("Could NOT Delete Athlete Team Year ID: " + year.id + " (You MUST have at least one Athlete Team Year)");
                                                    }
                                                    await athleteTeamYearRepository.delete(year.id);
                                                } else {
                                                    throw new NotFoundError("Could NOT Find the Athlete Team Year ID: " + year.id);
                                                }
                                            } else {
                                                throw new ValidationError("An Athlete Team Year ID is Required for a 'Delete' Operation")
                                            }
                                            break;
                                    }
                                }
                            }
                        } else {
                            throw new NotFoundError("Could NOT Find the Athlete Team ID: " + team.id)
                        }
                    } else {
                        throw new ValidationError("An Athlete Team ID is Required for an Edit Operation")
                    }
                    break;
                // Handle Deletion of an Existing AthleteTeam
                case ActionType.Delete:
                    if (team.id) {
                        const athleteTeamEntity = await athleteTeamRepository.findOne(team.id, { tx });
                        if (athleteTeamEntity) {
                            const athleteTeamEntities = await athleteTeamRepository.find({
                                athleteId: athleteId
                            }, { tx });
                            if (athleteTeamEntities.length <= 1
                                && !requestBody.data.team.find((athleteTeams) => athleteTeams.action === 'add')) {
                                throw new ValidationError("Could NOT Delete Athlete Team ID: " + team.id + " (You MUST have at least one Athlete Team)");
                            }
                            await athleteTeamRepository.delete(athleteTeamEntity.athleteTeamId, tx);
                            await safeDeleteTeam(tx, athleteTeamEntity.teamId);
                        } else {
                            throw new NotFoundError("Could NOT Find the Athlete Team ID: " + team.id)
                        }
                    } else {
                        throw new ValidationError("An Athlete Team ID is Required for an 'Edit' Operation")
                    }
                    break;
            }
        }
    }
}

/**
 * Utility Function (Extra Long) that Adds/Edits/Deletes Athlete Highlights
 * @param tx The Transaction Pool Client
 * @param athleteId The Athlete ID (Primary Key of Athlete) to Update
 * @param requestBody New Data to Update With
 */
async function updateAthleteHighlights(
    tx: PoolClient,
    athleteId: string,
    requestBody: UpdateAthleteDetailsRequestBody
) {
    if (requestBody.data.highlights) {
        // Loop through each Highlight Object
        for (const highlight of requestBody.data.highlights) {
            switch (highlight.action) {
                // Handle Addition of New Highlight
                case ActionType.Add:
                    if (highlight.data) {
                        await highlightRepository.create({
                            athleteId,
                            url: highlight.data
                        }, tx);
                    } else {
                        throw new ValidationError("All Highlight Details are required for 'Addition'");
                    }
                    break;
                // Handle Editing of Existing Highlight
                case ActionType.Edit:
                    if (highlight.id) {
                        const highlightEntity = await highlightRepository.findOne(highlight.id, { tx });
                        if (highlightEntity) {
                            await highlightRepository.update(highlight.id, {
                                url: highlight.data
                            }, tx);
                        } else {
                            throw new NotFoundError("Could NOT Find the Highlight ID: " + highlight.id)
                        }
                    } else {
                        throw new ValidationError("A Highlight ID is Required for an 'Edit' Operation")
                    }
                    break;
                // Handle Deletion of Existing Highlight
                case ActionType.Delete:
                    if (highlight.id) {
                        const highlightEntity = await highlightRepository.findOne(highlight.id, { tx });
                        if (highlightEntity) {
                            await highlightRepository.delete(highlight.id, tx);
                        } else {
                            throw new NotFoundError("Could NOT Find the Highlight ID: " + highlight.id)
                        }
                    } else {
                        throw new ValidationError("A Highlight ID is Required for an 'Edit' Operation")
                    }
                    break;

            }
        }
    }
}

/**
 * Utility Function that Creates or Re-Uses a Team
 * @param tx The Transaction Pool Client
 * @param teamName The Team Name
 * @param teamType The Team Type
 * @param country The Team Country (Optional)
 * @param city The Team City (Optional)
 * @param school The Team School (Optional)
 * @returns The Team Object 
 */
async function createOrReuseTeam(tx: PoolClient, teamName: string, teamType: TeamType, country?: string | null, city?: string, school?: string) {
    const searchTeams = await teamRepository.find({
        teamName,
        teamType,
        country,
        city,
        school
    }, { tx });
    if (searchTeams.length > 0) {
        return searchTeams[0];
    } else {
        return await teamRepository.create({
            teamName,
            teamType,
            country,
            city,
            school
        }, tx);
    }
}

/**
 * Safely Deletes a Team if NOT in Use
 * @param tx The Transaction Pool Client
 * @param teamId The Team ID to Delete
 */
async function safeDeleteTeam(tx: PoolClient, teamId: string) {
    const athleteTeams = await athleteTeamRepository.find({
        teamId
    }, { tx });
    const staffTeams = await staffRepository.find({
        teamId
    }, { tx });
    if (athleteTeams.length === 0 && staffTeams.length === 0) {
        await teamRepository.delete(teamId, tx);
    }
}

/**
 * Update Staff Details Function
 * @param tx The Transaction Pool Client
 * @param userId The User ID (Primary Key of User)
 * @param requestBody The Request Body
 */
export async function updateStaffDetails(
    tx: PoolClient,
    userId: string,
    requestBody: UpdateStaffDetailsRequestBody
) {
    if (requestBody.data.team) {
        const staffSearch = await staffRepository.find({
            userId,
        }, { tx });
        let staff: Staff;
        if (staffSearch.length > 0) {
            staff = staffSearch[0];
            let newTeam: Team;
            if (requestBody.data.team.type || requestBody.data.team.name
                || !isUndefined(requestBody.data.team.country) || !isUndefined(requestBody.data.team.city)
                || !isUndefined(requestBody.data.team.school)) {
                const oldTeam = await teamRepository.findOne(staff.teamId, { tx });
                newTeam = await createOrReuseTeam(
                    tx,
                    requestBody.data.team.name ?? oldTeam.teamName,
                    requestBody.data.team.type ?? oldTeam.teamType as TeamType,
                    isUndefined(requestBody.data.team.country) ? oldTeam.country : requestBody.data.team.country,
                    isUndefined(requestBody.data.team.city) ? oldTeam.city : requestBody.data.team.city,
                    isUndefined(requestBody.data.team.school) ? oldTeam.school : requestBody.data.team.school
                );
            }
            await staffRepository.update(staff.staffId, {
                teamPosition: requestBody.data.team.position,
                teamId: newTeam?.teamId
            }, tx);
            if (newTeam) {
                await safeDeleteTeam(tx, staff.teamId);
            }
        } else {
            if (requestBody.data.team.name && requestBody.data.team.type
                && requestBody.data.team.position) {
                const newTeam = await createOrReuseTeam(
                    tx,
                    requestBody.data.team.name,
                    requestBody.data.team.type,
                    requestBody.data.team.country,
                    requestBody.data.team.city,
                    requestBody.data.team.school
                );
                staff = await staffRepository.create({
                    userId,
                    teamPosition: requestBody.data.team.position,
                    teamId: newTeam.teamId
                }, tx);
            } else {
                throw new ValidationError("All Staff Basic Details are Required for Initial Onboarding")
            }
        }
    }
}