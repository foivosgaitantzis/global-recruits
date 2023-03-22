import { PGRepository } from '../database/PGRepository'

export interface Highlight {
    highlightId: string,
    athleteId: string,
    url: string
}

export class HighlightRepository extends PGRepository<Highlight> {
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