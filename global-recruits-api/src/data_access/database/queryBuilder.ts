import { AnyObject } from "./types"

export type ID = string | number
export type ColumnData = string | {
  name: string
  hidden?: boolean
}

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

export const insertValues = (values: any[]) => values.map((_, index) => `$${index + 1}`).join(', ')