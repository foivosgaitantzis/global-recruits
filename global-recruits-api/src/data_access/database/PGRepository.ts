import { Pool, PoolClient } from 'pg'
import { isUndefined } from '../../helpers/helper'
import { buildAliasMapper, insertValues } from './queryBuilder'
import { BaseRepository, FindOptions, ID, ColumnData } from './types'
import { query, queryRow } from './utils'

/**
 * Postgres SQL Repository Class
 */
export class PGRepository<T> implements BaseRepository<T, PoolClient> {
    readonly table: string
    readonly primaryKey: string
    readonly pool: Pool
    readonly columnAlias: (col: keyof T) => string
    readonly cols: (...args: Array<keyof T>) => string
    readonly allColumns: string
    readonly where: (values: Partial<T>, initialIndex?: number) => string

    constructor({
        table,
        mapping,
        // variable for storing id/primaryKey, for situations when out 'id' columns have name like 'postId'.
        // by default we think what primaryKey is 'id'
        primaryKey = 'id',
    }: {
        table: string
        primaryKey?: string
        mapping: Record<keyof T, ColumnData>
    }) {
        const aliasMapper = buildAliasMapper<T>(mapping, table)

        this.table = `"${table}"`
        this.columnAlias = aliasMapper
        this.primaryKey = primaryKey

        // select SQL-generator for only specific columns
        // example payload: ['createdAt']
        // output: '"created_at" as "createdAt"'
        this.cols = (...args: Array<keyof T>) => args.map(key => `${aliasMapper(key)} AS "${key.toString()}"`).join(', ')
        // Almost the same as this.cols, only predefined and for all columns except hidden columns
        this.allColumns = Object.entries(mapping).reduce((acc, [key, value]: [string, ColumnData]) => {
            if (typeof value === 'object' && value.hidden) {
                return acc
            }

            const sql = `${aliasMapper(key as keyof T)} AS "${key}"`

            return acc
                ? acc += `, ${sql}`
                : sql
        }, '')
        // SQL-generator for WHERE clause
        this.where = (values: Partial<T>, initialIndex = 0) => {
            let offset = 0;
            const sql = Object.keys(values).reduce((acc, key, index) => {
                const value = values[key];
                const condition = `${aliasMapper(key as keyof T)} = $${index + initialIndex + 1 - offset}`
                if (!isUndefined(value)) {
                    return acc === ''
                        ? `${acc} ${condition}`
                        : `${acc}AND ${condition}`
                } else {
                    offset += 1;
                    return acc;
                }
            }, '')

            return `WHERE ${sql}`
        }
    }

    async create(value: Partial<T>, tx?: PoolClient): Promise<T> {
        const _cols: string[] = []
        const _values: any[] = []

        for (const key of Object.keys(value) as Array<keyof T>) {
            _cols.push(this.columnAlias(key))
            _values.push(value[key])
        }

        const cols = _cols.join(', ')
        const values = insertValues(_values)

        const row = await queryRow<T>(
            `INSERT INTO ${this.table} (${cols}) VALUES (${values}) RETURNING ${this.allColumns}`,
            _values,
            tx,
        )

        return row
    }

    async createMany(values: Partial<T>[], tx?: PoolClient): Promise<T[]> {
        const _cols: string[] = []
        const _values: any[][] = []

        for (const value of values) {
            const keys = Object.keys(value) as Array<keyof T>

            for (const key of keys) {
                if (_cols.length !== keys.length) _cols.push(this.columnAlias(key))

                _values.push(value[key] as any)
            }
        }

        const cols = _cols.join(', ')
        const inlinedValues = values
            .map((_, index) => `(${_cols.map((_, cIndex) => {
                const offset = index !== 0
                    ? _cols.length * index
                    : 0

                return `$${cIndex + 1 + offset}`
            })})`)
            .join(', ')

        const rows = await query<T>(`
      INSERT INTO ${this.table} (${cols})
      VALUES ${inlinedValues}
      RETURNING ${this.allColumns}
    `, _values, tx)

        return rows
    }

    update(id: ID, newValue: Partial<T>, tx?: PoolClient): Promise<T> {
        let queryValues = [];
        let offset = 0;
        const sqlSet = Object.keys(newValue).reduce((acc, key, index) => {
            const value = newValue[key];
            if (!isUndefined(value)) {
                queryValues.push(value);
                const sql = `${this.columnAlias(key as keyof T)} = $${index + 2 - offset}`
                return acc !== ''
                    ? `${acc}, ${sql}`
                    : sql
            } else {
                offset += 1;
                return acc;
            }
        }, '');

        return sqlSet !== ''
            ? queryRow<T>(
                `UPDATE ${this.table} SET ${sqlSet} WHERE "${this.primaryKey}" = $1 RETURNING ${this.allColumns}`,
                [id, ...queryValues],
                tx,
            )
            : this.findOne(id, { tx });
    }

    delete(id: ID, tx?: PoolClient): Promise<boolean> {
        return queryRow<boolean>(
            `DELETE FROM ${this.table} WHERE "${this.primaryKey}" = $1`,
            [id],
            tx,
        )
    }

    async find(value: Partial<T>, options: FindOptions<T, PoolClient> = {}): Promise<T[]> {
        const values = [];
        const cols = options.select
            ? this.cols(...options.select)
            : this.allColumns

        const sql = `SELECT ${cols} FROM ${this.table} ${this.where(value)}`
        for (const fieldValue of Object.values(value)) {
            if (!isUndefined(fieldValue)) {
                values.push(fieldValue);
            }
        }
        const res = await query<T>(sql, values, options.tx)

        return res
    }

    async findOne(id: ID | Partial<T>, options: FindOptions<T, PoolClient> = {}): Promise<T> {
        const isPrimitive = typeof id !== 'object'
        const cols = options.select
            ? this.cols(...options.select)
            : this.allColumns
        const values = isPrimitive
            ? [id]
            : Object.values(id)

        let sql = `SELECT ${cols} FROM ${this.table}`

        if (isPrimitive) {
            sql += ` WHERE "${this.primaryKey}" = $1`
        } else {
            sql += ` ${this.where(id)}`
        }

        const res = await queryRow<T>(sql, values, options.tx)

        return res
    }

    async exist(id: ID | Partial<T>, tx?: PoolClient): Promise<boolean> {
        let sql = `SELECT COUNT(*)::integer as count FROM ${this.table}`
        const isPrimitive = typeof id !== 'object'
        const values = isPrimitive
            ? [id]
            : Object.values(id)

        if (isPrimitive) {
            sql += ` WHERE "${this.primaryKey}" = $1`
        } else {
            sql += ` ${this.where(id)}`
        }

        sql += ' LIMIT 1'

        const res = await queryRow<{ count: number }>(sql, values, tx)

        return res.count !== 0
    }
}