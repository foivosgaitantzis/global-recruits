import { CollegeSubType, TeamType } from '../../models/GlobalRecruits'
import { PGRepository } from '../database/PGRepository'

export interface Team {
    teamId: string,
    name: string,
    type: TeamType,
    subType?: CollegeSubType,
    division?: number,
    country?: string,
    city?: string,
    school?: string
}

export class TeamRepository extends PGRepository<Team> {
    constructor() {
        super({
            table: 'teams',
            mapping: {
                teamId: 'teamid',
                name: 'name',
                type: 'type',
                subType: 'subtype',
                division: 'division',
                country: 'country',
                city: 'city',
                school: 'school'
            },
            primaryKey: 'teamid'
        })
    }
}