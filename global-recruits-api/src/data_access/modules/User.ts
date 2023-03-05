import type { Pool } from 'pg'
import { PGRepository } from '../database/PGRepository'

export interface User {
    userId: number
    name: string
    email: string
    hash?: string
    createdAt: string
}

export class UserRepository extends PGRepository<User> {
    constructor(pool: Pool) {
        super({
            pool,
            table: 'users',
            mapping: {
                userId: 'userId',
                name: 'name',
                email: 'email',
                hash: {
                    name: 'password_hash',
                    hidden: true,
                },
                createdAt: 'created_at',
            },
            primaryKey: "userId"
        })
    }
}

const fivos = new UserRepository(pool);
fivos.findOne()