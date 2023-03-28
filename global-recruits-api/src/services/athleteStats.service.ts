import { PoolClient } from "pg";
import { queryRow } from "../data_access/database/utils";
import { AthleteTeam, AthleteTeamRepository } from "../data_access/modules/AthleteTeam";
import { AthleteTeamYearRepository, AthleteTeamYear } from "../data_access/modules/AthleteTeamYear";
import { Team, TeamRepository } from "../data_access/modules/Team";
import { CollegeSubType, TeamType } from "../models/GlobalRecruits";

/**
 * Initialize Database Repositories
 */
const teamRepository = new TeamRepository();
const athleteTeamRepository = new AthleteTeamRepository();
const athleteTeamYearRepository = new AthleteTeamYearRepository();

/**
 * Query to Retrieve an Athlete's Most Significant Team 
 * @param tx The Postgres Client
 * @param athleteId The Athlete ID to Query for
 * @returns The Most Significant Team Object
 */
export async function getAthleteMostSignificantTeam(
    tx: PoolClient,
    athleteId: string
): Promise<AthleteTeam & AthleteTeamYear & Team> {
    const result = await queryRow<AthleteTeam & AthleteTeamYear & Team>(
        `
        SELECT ${teamRepository.allColumnsTableName}, ${athleteTeamRepository.allColumnsTableName}, ${athleteTeamYearRepository.allColumnsTableName}
        FROM public.athleteteams athleteteams
        INNER JOIN public.athleteteamyears athleteteamyears ON athleteteams.athleteteamid = athleteteamyears.athleteteamid
        INNER JOIN public.teams teams ON athleteteams.teamId = teams.teamId
        WHERE athleteteams.athleteId = $1
        ORDER BY 
            CASE teams.type
                when '${TeamType.Professional}' THEN 1
                when '${TeamType.College}' THEN 2
                when '${TeamType.Club}' THEN 3
                when '${TeamType.PrepSchool}' THEN 4
                when '${TeamType.HighSchool}' THEN 5
                when '${TeamType.MiddleSchool}' THEN 6
                when '${TeamType.ElementarySchool}' THEN 7
            END,
            CASE teams.subtype
                when '${CollegeSubType.Ncaa}' THEN 1
                when '${CollegeSubType.Juco}' THEN 2
                when '${CollegeSubType.Naia}' THEN 3
                when '${CollegeSubType.Njcaa}' THEN 4
                when '${CollegeSubType.CommunityCollege}' THEN 5
            END,
            CASE teams.division
                when 1 THEN 1
                when 2 THEN 2
                when 3 THEN 3
            END,
            athleteteams.classOf DESC,
            athleteteamyears.year DESC,
            athleteteamyears.avgppg DESC,
            athleteteamyears.avgapg DESC,
            athleteteamyears.avgrpg DESC
        LIMIT 1
        `,
        [athleteId],
        tx
    );
    return result;
}