import { PGRepository } from '../database/PGRepository'

export interface AthleteTeam {
    athleteTeamId: string,
    athleteId: string,
    teamId: string,
    teamPosition: string
}

export class AthleteTeamRepository extends PGRepository<AthleteTeam> {
    constructor() {
        super({
            table: 'athleteteams',
            mapping: {
                athleteTeamId: 'athleteteamid',
                athleteId: 'athleteid',
                teamId: 'teamid',
                teamPosition: 'teamposition'
            },
            primaryKey: 'athleteteamid'
        })
    }
}