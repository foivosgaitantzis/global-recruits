import { PoolClient } from "pg";
import { getPostgresConnection } from "../data_access/database/connect";
import { beginPostgresTransaction, commitPostgresTransaction, rollbackPostgresTransaction } from "../data_access/database/utils";
import { Athlete, AthleteRepository } from "../data_access/modules/Athlete";
import { AthleteTeamRepository } from "../data_access/modules/AthleteTeam";
import { AthleteTeamYearRepository } from "../data_access/modules/AthleteTeamYear";
import { HighlightRepository } from "../data_access/modules/Highlight";
import { Staff, StaffRepository } from "../data_access/modules/Staff";
import { TeamRepository } from "../data_access/modules/Team";
import { UserRepository } from "../data_access/modules/User";
import { ForbiddenError, NotFoundError, PostgresError, ValidationError } from "../errors/CustomErrors";
import { isUndefined } from "../helpers/helper";
import { ActionType, CollegeSubType, MemberType, TeamType, UpdateAthleteDetailsRequestBody, UpdateStaffDetailsRequestBody } from "../models/GlobalRecruits";
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
 * Update Member Details Function
 * @param oauthSub The OAuthSub of the User to Update
 * @param requestBody The New Data to Update With
 */
export async function updateMemberDetails(
    requestBody: UpdateAthleteDetailsRequestBody | UpdateStaffDetailsRequestBody,
    oauthSub: string,
    userId: string
) {
    const tx = await getPostgresConnection();
    try {
        await beginPostgresTransaction(tx);
        const searchUserId = await getMemberAccess(tx, oauthSub, userId, [MemberType.Administrator]);
        const searchUsers = await userRepository.find({
            userId: searchUserId
        }, { tx });
        const user = searchUsers[0];
        if (!(searchUsers.length > 0 && user)) {
            throw new NotFoundError("No user was found with that UserId: '" + searchUserId + "'");
        }
        if (user.type !== requestBody.type) {
            throw new ValidationError("Your User does NOT belong in the Category of '" + requestBody.type + "'");
        }
        await updateBasicDetails(tx, user.userId, requestBody);
        if (user.type === MemberType.Athlete) {
            const athlete = await updateAthleteDetails(tx, user.userId, requestBody as UpdateAthleteDetailsRequestBody);
            await updateAthleteTeamDetails(tx, athlete.athleteId, requestBody as UpdateAthleteDetailsRequestBody);
            await updateAthleteHighlights(tx, athlete.athleteId, requestBody as UpdateAthleteDetailsRequestBody);
        } else if (user.type === MemberType.Staff) {
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
            && requestBody.data.city) {
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
 * Update Athlete Team Details
 * @param tx The Transaction Client
 * @param athleteId The Athlete ID
 * @param requestBody The Request Body
 */
async function updateAthleteTeamDetails(
    tx: PoolClient,
    athleteId: string,
    requestBody: UpdateAthleteDetailsRequestBody
) {
    if (requestBody.data.team && requestBody.data.team.length > 0) {
        for (const team of requestBody.data.team) {
            switch (team.action) {
                // ADD an AthleteTeam
                case ActionType.Add:
                    // Ensure all Team Basic Details are there
                    if (team.data?.name && team.data?.position && team.data?.type) {
                        validateTeam(requestBody.type as MemberType, team.data.type, team.data.subType, team.data.division, team.data.classOf);
                        const teamEntity = await createOrReuseTeam(tx, team.data.name, team.data.type, team.data.subType, team.data.division, team.data.country, team.data.city, team.data.school);
                        const athleteTeamEntity = await athleteTeamRepository.create({
                            athleteId,
                            teamId: teamEntity.teamId,
                            position: team.data.position,
                            classOf: team.data.classOf
                        }, tx);
                        // Make sure that at least a year of Stats is Provided
                        if (!(team.data.years && team.data.years.length > 0)) {
                            throw new ValidationError("At least one year of Team Statistics are 'Required'");
                        }
                        // Add the Necessary Years (At Least One)
                        for (const year of team.data.years) {
                            if (year.action !== ActionType.Add) {
                                throw new ValidationError("You can only 'Add' yearly data to a New Team");
                            }
                            await updateAthleteTeamYearDetails(
                                tx,
                                athleteTeamEntity.athleteTeamId,
                                year.action,
                                year.id,
                                year.data?.year,
                                year.data?.stats?.avgPpg,
                                year.data?.stats?.avgApg,
                                year.data?.stats?.avgRpg
                            );
                        }
                    } else {
                        throw new ValidationError("All team details required for 'Addition'");
                    }
                    break;
                // EDIT an AthleteTeam
                case ActionType.Edit:
                    if (!team.id) {
                        throw new ValidationError("Please provide a valid AthleteTeam Id");
                    }
                    const athleteTeamEntity = await athleteTeamRepository.findOne(team.id, { tx });
                    if (!athleteTeamEntity) {
                        throw new NotFoundError("Could not Find the AthleteTeam Id " + team.id);
                    }
                    // Get Previous Team Details
                    const oldTeam = await teamRepository.findOne(athleteTeamEntity.teamId, { tx });
                    // Determine whether to Use Previous Values
                    const name = team.data?.name ?? oldTeam.name;
                    const type = team.data?.type ?? oldTeam.type;
                    // Handle Nullable Fields
                    const subType = isUndefined(team.data?.subType) ? oldTeam.subType : team.data?.subType;
                    const division = isUndefined(team.data?.division) ? oldTeam.division : team.data?.division;
                    const country = isUndefined(team.data?.country) ? oldTeam.country : team.data?.country;
                    const city = isUndefined(team.data?.city) ? oldTeam.city : team.data?.city;
                    const school = isUndefined(team.data?.school) ? oldTeam.school : team.data?.school;
                    const classOf = isUndefined(team.data?.classOf) ? athleteTeamEntity.classOf : team.data?.classOf;
                    // Validate Team Input
                    validateTeam(requestBody.type as MemberType, type, subType, division, classOf);
                    // Create or Reuse Team Data
                    const newTeam = await createOrReuseTeam(tx, name, type, subType, division, country, city, school);
                    // Update AthleteTeam Data
                    await athleteTeamRepository.update(team.id, {
                        athleteId,
                        teamId: newTeam.teamId,
                        position: team.data?.position,
                        classOf
                    }, tx);
                    // Attempt to Delete Old Team Safely
                    await safeDeleteTeam(tx, oldTeam.teamId);
                    if (team.data.years && team.data.years.length > 0) {
                        for (const year of team.data.years) {
                            await updateAthleteTeamYearDetails(
                                tx,
                                athleteTeamEntity.athleteTeamId,
                                year.action,
                                year.id,
                                year.data?.year,
                                year.data?.stats?.avgPpg,
                                year.data?.stats?.avgApg,
                                year.data?.stats?.avgRpg
                            );
                        }
                        // Sanity Check that there is at Least 1 Year of Stats
                        const teamYears = await athleteTeamYearRepository.find({
                            athleteTeamId: team.id
                        }, { tx });
                        if (!(teamYears && teamYears.length > 0)) {
                            throw new ValidationError("There must be at least 1 year of Stats")
                        }
                    }
                    break;
                // DELETE an AthleteeTeam
                case ActionType.Delete:
                    if (team.id) {
                        const athleteTeamEntity = await athleteTeamRepository.findOne(team.id, { tx });
                        if (!athleteTeamEntity) {
                            throw new NotFoundError("Could not Find the AthleteTeam Id " + team.id);
                        }
                        await athleteTeamRepository.delete(athleteTeamEntity.athleteTeamId, tx);
                        await safeDeleteTeam(tx, athleteTeamEntity.teamId);
                    } else {
                        throw new ValidationError("Please provide a valid AthleteTeam Id");
                    }
                    break;
            }
        }
        const athleteTeams = await athleteTeamRepository.find({
            athleteId
        }, { tx });
        if (!(athleteTeams && athleteTeams.length > 0)) {
            throw new ValidationError("You must have at least 1 Team")
        }
    }
}


/**
 * Adds/Updates/Deletes a Year of Stats
 * @param tx The Transaction Client
 * @param athleteTeamId The Athlete Team ID
 * @param action The Action ex. Add
 * @param id The Athlete Team Year ID (for Edit/Delete)
 * @param year The Year of Stats
 * @param avgPpg Avg. Points Per Game
 * @param avgApg Avg. Assists per Game
 * @param avgRpg Avg. Rebounds per Game
 */
async function updateAthleteTeamYearDetails(
    tx: PoolClient,
    athleteTeamId: string,
    action: ActionType,
    id?: string,
    year?: number,
    avgPpg?: number,
    avgApg?: number,
    avgRpg?: number
) {
    switch (action) {
        // ADD a Year of Stats
        case ActionType.Add:
            if (year && avgPpg && avgApg && avgRpg) {
                await athleteTeamYearRepository.create({
                    athleteTeamId,
                    year,
                    avgPpg,
                    avgApg,
                    avgRpg
                }, tx);
            } else {
                throw new ValidationError("All Athlete Yearly Data are required for 'Addition'");
            }
            break;
        // EDIT a Year of Stats
        case ActionType.Edit:
            if (id) {
                const athleteTeamYearEntity = await athleteTeamYearRepository.findOne(id, { tx });
                if (athleteTeamYearEntity) {
                    await athleteTeamYearRepository.update(id, {
                        year: year,
                        avgPpg: avgPpg,
                        avgApg: avgApg,
                        avgRpg: avgRpg
                    }, tx);
                } else {
                    throw new NotFoundError("Could not Find the AthleteTeamYear Id " + id);
                }
            } else {
                throw new ValidationError("Please provide a valid AthleteTeamYear Id");
            }
            break;
        // DELETE a Year of Stats
        case ActionType.Delete:
            if (id) {
                const athleteTeamYearEntity = await athleteTeamYearRepository.findOne(id, { tx });
                if (athleteTeamYearEntity) {
                    await athleteTeamYearRepository.delete(id, tx);
                } else {
                    throw new NotFoundError("Could not Find the AthleteTeamYear Id " + id);
                }
            } else {
                throw new ValidationError("Please provide a valid AthleteTeamYear Id");
            }
            break;
    }
}

/**
 * General Validation for Teams
 * @param userType The Member Type ex. Athlete
 * @param type The Team Type ex. College
 * @param subType The College Teams Subtype NJCAA, etc.
 * @param division The NCAA/NJCAA Divisions
 * @param classOf The Class of (for High School)
 */
function validateTeam(userType: MemberType, type: TeamType, subType: CollegeSubType, division: number, classOf?: number) {
    if ((userType === MemberType.Athlete) && (type === TeamType.ElementarySchool || type === TeamType.MiddleSchool
        || type === TeamType.HighSchool || type === TeamType.PrepSchool) && !classOf) {
        throw new ValidationError("A School Team Requires a 'ClassOf'");
    }
    if ((userType === MemberType.Athlete) && !(type === TeamType.ElementarySchool || type === TeamType.MiddleSchool
        || type === TeamType.HighSchool || type === TeamType.PrepSchool) && classOf) {
        throw new ValidationError("You can only use a 'ClassOf' with School Teams");
    }
    if (type === TeamType.College && !subType) {
        throw new ValidationError("A College Team requires a 'SubType'");
    }
    if (type !== TeamType.College && subType) {
        throw new ValidationError("You can only use a 'SubType' for a College Team");
    }
    if ((subType && (subType === CollegeSubType.Ncaa || subType === CollegeSubType.Njcaa)) && !division) {
        throw new ValidationError("NCAA/NJCAA College Teams Require a 'Division'");
    }
    if (!(subType && (subType === CollegeSubType.Ncaa || subType === CollegeSubType.Njcaa)) && division) {
        throw new ValidationError("You can only use a 'Division' for an NCAA/NJCAA College Team");
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
 * @param name The Team Name
 * @param type The Team Type ex. College
 * @param subType The Team SubType (if College)
 * @param division The Team Division (if SubType NCAA or NJCAA)
 * @param country The Team Country (Optional)
 * @param city The Team City (Optional)
 * @param school The Team School (Optional)
 * @returns The Team Object 
 */
async function createOrReuseTeam(
    tx: PoolClient,
    name: string,
    type: TeamType,
    subType?: CollegeSubType,
    division?: number,
    country?: string | null,
    city?: string,
    school?: string
) {
    const searchTeams = await teamRepository.find({
        name,
        type,
        subType,
        division,
        country,
        city,
        school
    }, { tx });
    if (searchTeams.length > 0) {
        return searchTeams[0];
    } else {
        return await teamRepository.create({
            name,
            type,
            subType,
            division,
            country,
            city,
            school
        }, tx);
    }
}

/**
 * Safely Deletes a Team if NOT in Use
 * @param tx The Transaction Pool Client
 * @param teamId The Team ID (Primary Key of Teams) to Delete
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
        if (staffSearch && staffSearch.length > 0) {
            staff = staffSearch[0];
            // Get Previous Team Details
            const oldTeam = await teamRepository.findOne(staff.teamId, { tx });
            // Determine whether to Use Previous Values
            const name = requestBody.data?.team?.name ?? oldTeam.name;
            const type = requestBody.data?.team?.type ?? oldTeam.type;
            // Handle Nullable Fields
            const subType = isUndefined(requestBody.data?.team?.subType) ? oldTeam.subType : requestBody.data?.team?.subType;
            const division = isUndefined(requestBody.data?.team?.division) ? oldTeam.division : requestBody.data?.team?.division;
            const country = isUndefined(requestBody.data?.team?.country) ? oldTeam.country : requestBody.data?.team?.country;
            const city = isUndefined(requestBody.data?.team?.city) ? oldTeam.city : requestBody.data?.team?.city;
            const school = isUndefined(requestBody.data?.team?.school) ? oldTeam.school : requestBody.data?.team?.school
            // Validate Team Input
            validateTeam(requestBody.type as MemberType, type, subType, division);
            // Create or Reuse Team Data
            const newTeam = await createOrReuseTeam(tx, name, type, subType, division, country, city, school);
            // Update Staff Data
            await staffRepository.update(staff.staffId, {
                position: requestBody.data.team.position,
                teamId: newTeam?.teamId
            }, tx);
            await safeDeleteTeam(tx, oldTeam.teamId);
        } else {
            if (requestBody.data.team.name && requestBody.data.team.type
                && requestBody.data.team.position) {
                const newTeam = await createOrReuseTeam(
                    tx,
                    requestBody.data.team.name,
                    requestBody.data.team.type,
                    requestBody.data.team.subType,
                    requestBody.data.team.division,
                    requestBody.data.team.country,
                    requestBody.data.team.city,
                    requestBody.data.team.school
                );
                staff = await staffRepository.create({
                    userId,
                    position: requestBody.data.team.position,
                    teamId: newTeam.teamId
                }, tx);
            } else {
                throw new ValidationError("All Staff Basic Details are Required for Initial Onboarding")
            }
        }
    }
}