import { PGRepository } from '../database/PGRepository'

export interface Highlights {
    highlightId: string,
    athleteId: string,
    url: string
}

export class HighlightsRepository extends PGRepository<Highlights> {
    constructor() {
        super({
            table: 'highlights',
            mapping: {
                highlightId: 'highlightid',
                athleteId: 'athleteid',
                url: 'url'
            },
            primaryKey: 'athleteteamid'
        })
    }
}