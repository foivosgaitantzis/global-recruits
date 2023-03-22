import { CollegeSubType, PositionType, TeamType } from "./GlobalRecruits"

export interface AthleteTeamDetails {
    id: string,
    data: {
        type: TeamType,
        subType?: CollegeSubType,
        division?: number,
        classOf?: number,
        name: string,
        country?: string,
        city?: string,
        school?: string,
        position: PositionType,
        years: {
            id: string,
            data: {
                year: number,
                stats: {
                    avgPpg: number,
                    avgApg: number,
                    avgRpg: number
                }
            }
        } []
    }
}

export interface StaffTeamDetails {
    type?: TeamType,
    subType?: CollegeSubType,
    division?: number,
    name?: string,
    school?: string,
    position?: string, 
    country?: string,
    city?: string
}