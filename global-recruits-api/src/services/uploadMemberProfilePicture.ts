import { getPostgresConnection } from "../data_access/database/connect";
import { ForbiddenError, NotFoundError, PostgresError, ValidationError } from "../errors/CustomErrors";
import { BlobStorageProfilePicturesContainer } from "../helpers/loadEnvironmentVariables";
import { getBlobStorageContainerClient, saveFileToBlobStorage } from "./blobStorage.service";
import { File } from "../models/File";
import { getMemberAccess } from "../validation/bearerToken";

/**
 * Service Function that Uploads a Member Profile Picture
 * @param file The Profile Picture File
 * @param oauthSub The OAuthSub of the Logged in User
 */
export async function uploadMemberProfilePicture(
    file: File,
    oauthSub: string
) {
    const tx = await getPostgresConnection();
    try {
        const userId = await getMemberAccess(tx, oauthSub, "@me", []);
        const blobClient = getBlobStorageContainerClient(BlobStorageProfilePicturesContainer);
        await saveFileToBlobStorage(blobClient, userId, file);
    } catch (error: any) {
        if (error instanceof ValidationError || error instanceof NotFoundError || error instanceof ForbiddenError) {
            throw error;
        }
        throw new PostgresError(error.message);
    } finally {
        tx.release();
    }
}