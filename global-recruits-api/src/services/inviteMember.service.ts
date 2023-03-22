import { getPostgresConnection, POSTGRES_POOL } from "../data_access/database/connect";
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
 * @param type The User Type ex. Athlete
 */
export async function createUser(emailAddress: string, sub: string, type: MemberType) {
    const tx = await getPostgresConnection();
    try {
        await userRepository.create({
            oauthSub: sub,
            type,
            email: emailAddress
        }, tx);
    } catch (error: any) {
        throw new PostgresError(error.message);
    } finally {
        tx.release();
    }
}