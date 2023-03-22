import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { generateErrorResponse, generateValidationErrorResponse } from "../errors/helper";
import { ValidationErrorsResponse } from "../models/GlobalRecruits";
import { getMemberProfilePicture } from "../services/getMemberProfilePicture";
import { validateJWT } from "../validation/bearerToken";
import { getOpenApiPath, getParameterSchemas, validateSchemaTuples } from "../validation/schemaValidation";

/**
 * Get Member Profile Picture Azure Function
 */
const getMemberProfilePictureFunction: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    // Schema Validation
    const pathSchema = getOpenApiPath("/members/{memberId}/profilepicture", "get");
    const parameterSchema = getParameterSchemas(pathSchema, "path");
    const validationErrors: ValidationErrorsResponse = validateSchemaTuples([req?.params, parameterSchema]);
    if (validationErrors.length <= 0) {
        try {
            const oauthSub = await validateJWT(req.headers?.["authorization"]);
            const memberId: string = req.params['memberId'];
            const file = await getMemberProfilePicture(oauthSub, memberId);
            context.res = {
                status: 200,
                headers: {
                    "Content-Type": file.fileMediaType,
                },
                body: file.data
            }
        } catch (error: any) {
            context.log.error(error.message);
            context.res = generateErrorResponse(error);
        }
    } else {
        context.res = generateValidationErrorResponse(validationErrors);
    }
}

export default getMemberProfilePictureFunction;