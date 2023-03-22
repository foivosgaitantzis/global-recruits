import { MemberType } from '../../models/GlobalRecruits'
import { PGRepository } from '../database/PGRepository'

export interface User {
    userId: string
    oauthSub: string,
    type: MemberType
    email: string
    firstName?: string,
    lastName?: string
}

export class UserRepository extends PGRepository<User> {
    constructor() {
        super({
            table: 'users',
            mapping: {
                userId: 'userid',
                oauthSub: 'oauthsub',
                type: 'type',
                email: 'email',
                firstName: 'firstname',
                lastName: 'lastname'
            },
            primaryKey: 'userid'
        })
    }
}