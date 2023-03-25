import { PositionType } from '../../models/GlobalRecruits'
import { PGRepository } from '../database/PGRepository'

export interface AthleteTeam {
    athleteTeamId: string,
    athleteId: string,
    teamId: string,
    position: PositionType,
    classOf?: number
}

export class AthleteTeamRepository extends PGRepository<AthleteTeam> {
    constructor() {
        super({
            table: 'athleteteams',
            mapping: {
                athleteTeamId: 'athleteteamid',
                athleteId: 'athleteid',
                teamId: 'teamid',
                position: 'position',
                classOf: 'classof'
            },
            primaryKey: 'athleteteamid'
        })
    }
}