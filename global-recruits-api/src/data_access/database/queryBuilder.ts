import { AnyObject, ColumnData } from "./types"

/**
 * Utility Function that Builds an Interface -> Postgres Column Mapper
 * @param obj The Object Mappings ex. { userId: 'userid' }
 * @returns The Mapped DTO
 */
export function buildAliasMapper<T extends AnyObject>(obj: Record<keyof T, ColumnData>) {
	// use ES6 Map structure for performance reasons
	// More here: https://www.measurethat.net/Benchmarks/Show/11290/4/map-vs-object-real-world-performance
	const _mapper = new Map<keyof T, string>()

	for (const [key, value] of Object.entries(obj)) {
		// Create mapping 
		// JS representation property name to PostgreSQL column name
		_mapper.set(key, typeof value === 'string'
			? value
			: value.name)
	}

	// And return function what will get JS key and output PostgreSQL column name
	return (col: keyof T): string => `"${_mapper.get(col)!}"`
}

/**
 * Utility Function that Maps Insert Values for Postgres
 * @param values The Values to Insert
 * @returns A Utility String of Postgres Values ex. $1, $2, $3
 */
export function insertValues(values: any[]) {
	return values.map((_, index) => `$${index + 1}`).join(', ');
}