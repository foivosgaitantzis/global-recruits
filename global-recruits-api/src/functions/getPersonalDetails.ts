import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { generateErrorResponse } from "../errors/helper";
import { getMemberDetails } from "../services/getMember.service";
import { validateJWT } from "../validation/bearerToken";

/**
 * Get Member (Me) Azure Function
 */
const getPersonalDetailsFunction: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    try {
        const oauthSub = await validateJWT(req.headers?.["authorization"]);
        const data = await getMemberDetails(oauthSub);
        context.res = {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
        }
    } catch (error: any) {
        context.log.error(error.message);
        context.res = generateErrorResponse(error);
    }
}

export default getPersonalDetailsFunction;