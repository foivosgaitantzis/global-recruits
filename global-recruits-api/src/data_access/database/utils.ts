import { PoolClient } from 'pg'
import { getPostgresConnection } from './connect'

/**
 * Utility Function that is used to Query a Single Row
 * @param sql SQL Query 
 * @param values The Values Array to Passs down
 * @param tx The Pool Client (if one is Found)
 * @returns The Query Output 
 */
export async function queryRow<T = any>(sql: string, values: any[] | null, tx?: PoolClient): Promise<T> {
    // Get connection from PG Pool or use passed connection, will be explained below
    const client = await getPostgresConnection(tx);
        // Separate Input Values / No Input Values
    if (Array.isArray(values)) {
        try {
            const res = await client.query(sql, values);
            return res.rows[0] as T;
        } catch (e) {
            throw e;
        } finally {
            if (!tx) {
                client.release();
            }
        }
    } else {
        try {
            const res = await client.query(sql);
            return res.rows[0] as T
        } catch (e) {
            throw e
        } finally {
            if (!tx) {
                client.release();
            }
        }
    }
}

/**
 * Generic Query Function
 * @param sql SQL Query 
 * @param values The Values Array to Passs down
 * @param tx The Pool Client (if one is Found)
 * @returns The Query Output 
 */
export async function query<T = any>(sql: string, values?: any[] | null, tx?: PoolClient) {
    const client = await getPostgresConnection(tx);
    // Separate Input Values / No Input Values
    if (Array.isArray(values)) {
        try {
            const res = await client.query(sql, values);
            return res.rows as T[];
        } catch (e) {
            throw e
        } finally {
            if (!tx) {
                client.release();
            }
        }
    } else {
        try {
            const res = await client.query(sql);
            return res.rows as T[];
        } catch (e) {
            throw e
        } finally {
            if (!tx) {
                client.release();
            }
        }
    }
}

/**
 * Utility Function that Begins a Postgres Transaction
 * @param pool A Connected Pool Client
 */
export async function beginPostgresTransaction(pool: PoolClient) {
    await pool.query('BEGIN;');
}

/**
 * Utility Function that Commits a Postgres Transaction
 * @param pool A Connected Pool Client
 */
export async function commitPostgresTransaction(pool: PoolClient) {
    await pool.query('COMMIT;');
}

/**
 * Utility Function that Rollbacks a Postgres Transaction
 * @param pool A Connected Pool Client
 */
export async function rollbackPostgresTransaction(pool: PoolClient) {
    await pool.query('ROLLBACK;');
}