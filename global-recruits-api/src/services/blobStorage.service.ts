import { BlobServiceClient, ContainerClient } from "@azure/storage-blob";
import { NotFoundError } from "../errors/CustomErrors";
import { BlobStorageConnectionString } from "../helpers/loadEnvironmentVariables";
import { File } from "../models/File";

/**
 * Utility Function that Gets a Blob Storage Container Client
 * @param containerName The Container Name
 * @returns The Container Client ready to Server Requests
 */
export function getBlobStorageContainerClient(containerName: string) {
    const containerClient: ContainerClient = BlobServiceClient
        .fromConnectionString(BlobStorageConnectionString)
        .getContainerClient(containerName);
    if (!containerClient.exists) {
        containerClient.create();
    }
    return containerClient;
}

/**
 * Utility Function that Saves a File to Blob Storage
 * @param containerClient The Container Client
 * @param fileName The FileName (includes Path) ex. "/test/test.png"
 * @param file The File
 */
export async function saveFileToBlobStorage(containerClient: ContainerClient, fileName: string, file: File) {
    const blockBlob = containerClient.getBlockBlobClient(fileName);
    await blockBlob.upload(file.data, file.data.length, {
        blobHTTPHeaders: {
            blobContentType: file.fileMediaType
        }
    });
}

/**
 * Utility Function that Retrieves a File from Blob Storage
 * @param containerClient The Container Client
 * @param fileName The FileName (includes Path) ex. "/test/test.png"
 * @returns The File
 */
export async function getFileFromblobStorage(containerClient: ContainerClient, fileName: string): Promise<File> {
    const blockBlob = containerClient.getBlockBlobClient(fileName);
    const blobExists = await blockBlob.exists();
    if (!blobExists) {
        throw new NotFoundError("The Specified File does not exist: '" + fileName + "'");
    }
    const properties = await blockBlob.getProperties();
    const response = await blockBlob.download();
    const readableStreamBody = response.readableStreamBody;
    if (!readableStreamBody) {
        // Throw Blob Error
    }
    const buffer: Buffer = await new Promise((resolve, reject) => {
        const chunks: Buffer[] = [];
        readableStreamBody.on("data", (data) => {
            chunks.push(data instanceof Buffer ? data : Buffer.from(data));
        });
        readableStreamBody.on("end", () => {
            resolve(Buffer.concat(chunks));
        });
        readableStreamBody.on("error", reject);
    });
    return {
        fileMediaType: properties.contentType,
        fileName: fileName,
        fileSize: properties.contentLength,
        data: buffer
    }
}

/**
 * Utility Function that Deletes a File from Blob Storage
 * @param containerClient The Container Client
 * @param fileName The FileName (includes Path) ex. "/test/test.png"
 */
export async function deleteFileFromBlobStorage(containerClient: ContainerClient, fileName: string) {
    const blockBlob = containerClient.getBlockBlobClient(fileName);
    const blobExists = await blockBlob.exists();
    if (!blobExists) {
        throw new NotFoundError("The Specified File does not exist: '" + fileName + "'");
    }
    await blockBlob.delete();
}