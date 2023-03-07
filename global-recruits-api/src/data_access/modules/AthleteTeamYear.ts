import { PGRepository } from '../database/PGRepository'

export interface AthleteTeamYear {
    athleteTeamYearId: string,
    athleteTeamId: string,
    year: number,
    avgPpg: number,
    avgApg: number,
    avgRpg: number
}

export class AthleteTeamYearRepository extends PGRepository<AthleteTeamYear> {
    constructor() {
        super({
            table: 'athleteteamyears',
            mapping: {
                athleteTeamYearId: 'athleteteamyearid',
                athleteTeamId: 'athleteteamid',
                year: 'year',
                avgPpg: 'avgppg',
                avgApg: 'avgapg',
                avgRpg: 'avgrpg'
            },
            primaryKey: 'athleteteamyearid'
        })
    }
}