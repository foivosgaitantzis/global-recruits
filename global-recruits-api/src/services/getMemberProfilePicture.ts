import { getPostgresConnection } from "../data_access/database/connect";
import { UserRepository } from "../data_access/modules/User";
import { ForbiddenError, NotFoundError, PostgresError } from "../errors/CustomErrors";
import { BlobStorageProfilePicturesContainer } from "../helpers/loadEnvironmentVariables";
import { File } from "../models/File";
import { MemberType } from "../models/GlobalRecruits";
import { getMemberAccess } from "../validation/bearerToken";
import { getBlobStorageContainerClient, getFileFromblobStorage } from "./blobStorage.service";

/**
 * Initialize Database Repositories
 */
const userRepository = new UserRepository();

/**
 * Utility Function that Retrieves a Member Profile Picture
 * @param oauthSub The User OAuthSub
 * @param userId The User ID
 * @returns 
 */
export async function getMemberProfilePicture(
    oauthSub: string,
    userId: string
): Promise<File> {
    const tx = await getPostgresConnection();
    try {
        const searchUserId = await getMemberAccess(tx, oauthSub, userId, [MemberType.Administrator, MemberType.Staff]);
        const searchUsers = await userRepository.find({
            userId: searchUserId
        }, { tx });
        const user = searchUsers[0];
        if (!(searchUsers.length > 0 && user)) {
            throw new NotFoundError("No user was found with that " + (userId ? "User ID" : "OAuthSub"));
        }
        if (user.type !== MemberType.Athlete) {
            await getMemberAccess(tx, oauthSub, userId, [MemberType.Administrator]);
        }
        const blobClient = getBlobStorageContainerClient(BlobStorageProfilePicturesContainer);
        const file = await getFileFromblobStorage(blobClient, user.userId);
        return file;
    } catch (error: any) {
        if (error instanceof NotFoundError || error instanceof ForbiddenError) {
            throw error;
        }
        throw new PostgresError(error.message);
    } finally {
        tx.release();
    }
}