/**
 * Parser File Output
 */
export interface File {
    fileMediaType: string,
    fileName: string,
    fileSize: number,
    data: Buffer
}