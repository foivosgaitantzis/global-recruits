import { PGRepository } from '../database/PGRepository'

export interface User {
    userId: string
    oauthSub: string,
    userType: string
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
                userType: 'usertype',
                email: 'email',
                firstName: 'firstname',
                lastName: 'lastname'
            },
            primaryKey: 'userid'
        })
    }
}