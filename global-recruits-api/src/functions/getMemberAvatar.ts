import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { generateErrorResponse } from "../errors/helper";
import { DiscordUserResponse } from "../models/DiscordUserResponse";
import { ValidationErrorsResponse } from "../models/GlobalRecruits";
import { getUserAvatar, getUserData } from "../services/discordApi.service";
import { validateBearerToken } from "../validation/bearerToken";

/**
 * Get Discord Member Avatar Azure Function
 */
 const getMemberAvatarFunction: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    // Validate Bearer Token
    const validationErrors: ValidationErrorsResponse = [];
    validationErrors.push(...validateBearerToken(req.headers));

    if (validationErrors.length <= 0) {
        try {
            const oauthToken = req.headers['authorization'];
            const userData: DiscordUserResponse = await getUserData(req.headers['authorization']);
            const userAvatar = await getUserAvatar(oauthToken, userData.id, userData.avatar);
            context.res = {
                status: 200,
                body: userAvatar
            }
        } catch (error: any) {
            context.log.info(error.message);
            context.res = generateErrorResponse(error);
        }
    } else {
        // Output Validation Errors
        context.log.info(JSON.stringify(validationErrors));
        context.res = {
            headers: {
                'Content-Type': 'application/json'
            },
            status: 400,
            body: validationErrors
        }
    }
}

export default getMemberAvatarFunction;