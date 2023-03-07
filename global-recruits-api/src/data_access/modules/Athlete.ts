import { PGRepository } from '../database/PGRepository'

export interface Athlete {
    athleteId: string,
    userId: string,
    dateOfBirth: string,
    country: string,
    city: string,
    weight: number,
    weightUnit: string,
    height: number,
    heightUnit: string
}

export class AthleteRepository extends PGRepository<Athlete> {
    constructor() {
        super({
            table: 'athletes',
            mapping: {
                athleteId: 'athleteid',
                userId: 'userid',
                dateOfBirth: 'dateofbirth',
                country: 'country',
                city: 'city',
                weight: 'weight',
                weightUnit: 'weightunit',
                height: 'height',
                heightUnit: 'heightunit'
            },
            primaryKey: 'athleteid'
        })
    }
}