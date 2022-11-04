import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import axios from "axios";
import { generateErrorResponse } from "../errors/helper";
import { GetDiscordAccessTokenResponse, ValidationErrorsResponse } from "../models/GlobalRecruits";
import { getUserData } from "../services/discordApi.service";
import { getDiscordAccessToken } from "../services/discordAuth.service";
import { validateHeaders } from "../validation/getDiscordAccessToken";
import { getOpenApiPath, getParameterSchemas, validateSchemaTuples } from "../validation/schemaValidation";

/**
 * Get Discord Access Token Azure Function
 */
const getDiscordAccessTokenFunction: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    // Schema Validation
    const queryParameters = req.query;
    const pathSchema = getOpenApiPath("/auth", "post");
    const queryParametersSchema = getParameterSchemas(pathSchema, "query");
    const validationErrors: ValidationErrorsResponse = validateSchemaTuples(
        [queryParameters, queryParametersSchema]
    ); 

    const grantType = queryParameters.grantType as "authorization_code" | "refresh_token";

    validationErrors.push(...validateHeaders(grantType, req.headers));

    if (validationErrors.length <= 0) {
        try {
            const authorizationTokenResponse: GetDiscordAccessTokenResponse = await getDiscordAccessToken(grantType, req.headers);
            /*const userData = await getUserData(authorizationTokenResponse.access_token);
            await checkMemberInServer(userData.id);*/
            context.log.info("BEARER TOKEN: " + authorizationTokenResponse.access_token);
            context.res = {
                headers: {
                    'Content-Type': 'application/json'
                },
                status: 200,
                body: authorizationTokenResponse
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

export default getDiscordAccessTokenFunction;