import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { generateErrorResponse, generateValidationErrorResponse } from "../errors/helper";
import { ValidationErrorsResponse } from "../models/GlobalRecruits";
import { deleteMemberProfilePicture } from "../services/deleteMemberProfilePicture";
import { validateJWT } from "../validation/bearerToken";
import { getOpenApiPath, getParameterSchemas, validateSchemaTuples } from "../validation/schemaValidation";

/**
 * Deletes a Member Profile Picture Azure Function
 */
const deleteMemberProfilePictureFunction: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    // Schema Validation
    const pathSchema = getOpenApiPath("/members/{memberId}/profilepicture", "delete");
    const parameterSchema = getParameterSchemas(pathSchema, "path");
    const validationErrors: ValidationErrorsResponse = validateSchemaTuples([req?.params, parameterSchema]);
    if (validationErrors.length <= 0) {
        try {
            const oauthSub = await validateJWT(req.headers?.["authorization"]);
            const memberId: string = req.params['memberId'];
            await deleteMemberProfilePicture(oauthSub, memberId);
            context.res = {
                status: 204
            }
        } catch (error: any) {
            context.log.error(error.message);
            context.res = generateErrorResponse(error);
        }
    } else {
        context.res = generateValidationErrorResponse(validationErrors);
    }
}

export default deleteMemberProfilePictureFunction;