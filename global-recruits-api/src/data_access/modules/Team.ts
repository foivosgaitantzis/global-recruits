import { PGRepository } from '../database/PGRepository'

export interface Team {
    teamId: string,
    teamName: string,
    teamType: string,
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
                teamName: 'teamname',
                teamType: 'teamtype',
                country: 'country',
                city: 'city',
                school: 'school'
            },
            primaryKey: 'teamid'
        })
    }
}