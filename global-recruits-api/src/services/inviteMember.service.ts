import { getPostgresConnection, POSTGRES_POOL } from "../data_access/database/connect";
import { beginPostgresTransaction, commitPostgresTransaction, rollbackPostgresTransaction } from "../data_access/database/utils";
import { UserRepository } from "../data_access/modules/User";
import { PostgresError } from "../errors/CustomErrors";
import { MemberType } from "../models/GlobalRecruits";

/**
 * Create a New User Repository Instance
 */
const userRepository = new UserRepository();

/**
 * Service Function that Creates a New User
 * @param emailAddress The Email Address of the User
 * @param sub The OAuthSub of the User
 * @param userType The User Type ex. Athlete
 */
export async function createUser(emailAddress: string, sub: string, userType: MemberType) {
    const tx = await getPostgresConnection();
    try {
        await beginPostgresTransaction(tx);
        await userRepository.create({
            oauthSub: sub,
            userType,
            email: emailAddress
        }, tx);
        await commitPostgresTransaction(tx);
    } catch (error: any) {
        await rollbackPostgresTransaction(tx);
        throw new PostgresError(error.message);
    } finally {
        tx.release();
    }
}