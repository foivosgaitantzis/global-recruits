import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { generateErrorResponse } from "../errors/helper";
import * as fs from 'fs';

/**
 * Get Video Content Azure Function
 */
const getVideoContent: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    const range = req.headers.range;
    if (!range) {
        context.res = generateErrorResponse(new Error(""));
    }

    try {

        const videoPath = "./videos/sampleVideo.mp4";
        const videoSize = fs.statSync(videoPath).size;
        const CHUNK_SIZE = 10 ** 6;
        const start = Number(range.replace(/\D/g, ""));
        const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
        const contentLength = end - start + 1;

        const videoStream = fs.createReadStream(videoPath, { start, end });

        const chunks = []
        for await (let chunk of videoStream) {
            chunks.push(chunk)
        }

        //const stream = await streamToString(videoStream);

        const headers = {
            "Content-Range": `bytes ${start}-${end}/${videoSize}`,
            "Accept-Ranges": "bytes",
            "Content-Length": contentLength,
            "Content-Type": "video/mp4",
        };
        context.res = {
            headers,
            status: 206,
            body: Buffer.concat(chunks)
        }
    } catch (error: any) {
        context.log.info(error.message);
        context.res = generateErrorResponse(error);
    }
}

export default getVideoContent;