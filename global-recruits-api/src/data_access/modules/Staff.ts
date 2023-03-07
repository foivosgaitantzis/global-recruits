import { PGRepository } from '../database/PGRepository'

export interface Staff {
    staffId: string,
    userId: string,
    teamId: string,
    teamPosition?: string
}

export class StaffRepository extends PGRepository<Staff> {
    constructor() {
        super({
            table: 'staff',
            mapping: {
                staffId: 'staffid',
                userId: 'userid',
                teamId: 'teamid',
                teamPosition: 'teamposition'
            },
            primaryKey: 'staffid'
        })
    }
}