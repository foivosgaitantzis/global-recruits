import { ClientConfig, Pool, PoolClient } from "pg";
import { PostgresDatabase, PostgresHost, PostgresPassword, PostgresUser } from "../../helpers/loadEnvironmentVariables";

const PostgresClientConfig: ClientConfig = {
    user: PostgresUser,
    host: PostgresHost,
    database: PostgresDatabase,
    password: PostgresPassword,
    port: 5432,
    ssl: true
}

export let POSTGRES_POOL: Pool = new Pool(PostgresClientConfig);

/**
 * Gets a Connected Postgres Client
 * @param tx An Existing Pool Client (if one is not found)
 * @returns A New Pool Client (Connected) or Existing one if Found
 */
export function getPostgresConnection(tx?: PoolClient): Promise<PoolClient> {
    if (tx) {
        return tx as unknown as Promise<PoolClient>
    }
    return POSTGRES_POOL.connect();
}
