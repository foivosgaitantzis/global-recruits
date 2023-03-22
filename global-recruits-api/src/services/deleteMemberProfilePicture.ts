import { getPostgresConnection } from "../data_access/database/connect";
import { UserRepository } from "../data_access/modules/User";
import { ForbiddenError, NotFoundError, PostgresError } from "../errors/CustomErrors";
import { BlobStorageProfilePicturesContainer } from "../helpers/loadEnvironmentVariables";
import { MemberType } from "../models/GlobalRecruits";
import { getMemberAccess } from "../validation/bearerToken";
import { deleteFileFromBlobStorage, getBlobStorageContainerClient } from "./blobStorage.service";

/**
 * Initialize Database Repositories
 */
const userRepository = new UserRepository();

/**
 * Service Function that Deletes a Member Profile Picture
 * @param file The Profile Picture File
 * @param oauthSub The OAuthSub of the Logged in User
 */
export async function deleteMemberProfilePicture(
    oauthSub: string,
    userId: string
) {
    const tx = await getPostgresConnection();
    try {
        const searchUserId = await getMemberAccess(tx, oauthSub, userId, [MemberType.Administrator]);
        const searchUsers = await userRepository.find({
            userId: searchUserId
        }, { tx });
        const user = searchUsers[0];
        if (!(searchUsers.length > 0 && user)) {
            throw new NotFoundError("No user was found with that " + (userId ? "User ID" : "OAuthSub"));
        }
        const blobClient = getBlobStorageContainerClient(BlobStorageProfilePicturesContainer);
        await deleteFileFromBlobStorage(blobClient, user.userId);
    } catch (error: any) {
        if (error instanceof NotFoundError || error instanceof ForbiddenError) {
            throw error;
        }
        throw new PostgresError(error.message);
    } finally {
        tx.release();
    }
}