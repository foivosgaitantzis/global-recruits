import { getBoundary, parse } from "parse-multipart-data";
import { ValidationError } from "../errors/CustomErrors";
import { v4 as uuidv4 } from "uuid";
import { File } from "../models/File";

/**
 * Allowed File Media Types: Generic - Tech Debt: Add Specific Ones
 */
export enum AllowedFileMediaTypes {
    png = "image/png",
    jpeg = "image/jpeg"
}

/**
 * Validates a Multi Part Form
 * @param requestBody The Request Body 
 * @param requestHeaders The Request Headers
 * @returns The Form Files
 */
export function validateAndParseMultipartFormData(requestBody: any, requestHeaders: any): File[] {
    if (!requestBody) {
        throw new ValidationError("No files have been Submitted")
    }
    if (!(requestHeaders && requestHeaders["content-type"] && requestHeaders["content-type"].includes("multipart"))) {
        throw new ValidationError("Please enter a Valid Multipart Content-Type")
    }
    const boundary = getBoundary(requestHeaders["content-type"]);
    const bodyBuffer = Buffer.from(requestBody);
    const parts = parse(bodyBuffer, boundary);

    if (!parts?.length) {
        throw new ValidationError("The File Buffer is Incorrect");
    }
    return parts.map((part) => {
        const type = part.type.split("/");
        return {
            fileMediaType: part.type,
            fileName: part.filename ?? part.name ?? (uuidv4() + "." + type[type.length - 1]),
            fileSize: part.data.byteLength,
            data: part.data
        }
    })
}

/**
 * Validates a File Array
 * @param files The Files 
 * @param maxFileSize The Max File Size (per File)
 * @param maxFileNumber The Max File Count (Total Files)
 * @param maxFileListSize The Max File Sizes (Total Files - Cumulative)
 */
export async function validateFiles(files: File[], maxFileSize?: number, maxFileNumber?: number, maxFileListSize?: number): Promise<void> {
    if (maxFileNumber && files.length > maxFileNumber) {
        throw new ValidationError("Max File Number Exceeded: '" + maxFileNumber + "'");
    }
    if (maxFileListSize) {
        const cumulativeFileSize = files.reduce((acc, file) => {
            return acc + file.fileSize;
        }, 0);
        if (cumulativeFileSize > maxFileListSize) {
            throw new ValidationError("Cumulative File Size Exceeded: '" + (cumulativeFileSize / 1000000) + "/" + (maxFileListSize / 1000000) + " MB'");
        }
    }
    for (const file of files) {
        if (maxFileSize && file.fileSize > maxFileSize) {
            throw new ValidationError("File Size Exceeded: '" + (file.fileSize / 1000000) + "/" + (maxFileSize / 1000000) + " MB'");
        }
        if (!Object.values(AllowedFileMediaTypes).includes(file.fileMediaType as AllowedFileMediaTypes)) {
            throw new ValidationError("File Extension '" + file.fileMediaType + "' is an unsupported format");
        }
        const mimeType = await getFileMimeType(file);
        if (file.fileMediaType !== mimeType) {
            throw new ValidationError("File Signature '" + mimeType + "' does not match the file extension '" + file.fileMediaType + "'");
        }
    }

}

/**
 * Gets a File Signature - Vulnerability Prevention
 * @param file The File (from Parser)
 * @returns The Mime Type (as string or Undefined)
 */
async function getFileMimeType(file: File) {
    // Dynamically Imports the File-Type Library
    const dynamicImport = new Function('specifier', 'return import(specifier)');
    const { fileTypeFromBuffer } = await dynamicImport('file-type');
    const fileType = await fileTypeFromBuffer(file.data);
    return fileType?.mime;
}