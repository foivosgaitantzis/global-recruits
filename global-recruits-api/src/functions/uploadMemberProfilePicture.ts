import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { generateErrorResponse, generateValidationErrorResponse } from "../errors/helper";
import { ValidationErrorsResponse } from "../models/GlobalRecruits";
import { uploadMemberProfilePicture } from "../services/uploadMemberProfilePicture";
import { validateJWT } from "../validation/bearerToken";
import { validateAndParseMultipartFormData, validateFiles } from "../validation/files";
import { getOpenApiPath, getParameterSchemas, validateSchemaTuples } from "../validation/schemaValidation";

/**
 * Upload Member Profile Picture Azure Function
 */
const uploadMemberProfilePictureFunction: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    // Schema Validation
    const pathSchema = getOpenApiPath("/members/{memberId}/profilepicture", "post");
    const parameterSchema = getParameterSchemas(pathSchema, "path");
    const validationErrors: ValidationErrorsResponse = validateSchemaTuples([req?.params, parameterSchema]);
    if (validationErrors.length <= 0) {
        try {
            const files = validateAndParseMultipartFormData(req.body, req.headers);
            // Allow a Single File - 2 MB in Size
            await validateFiles(files, 2000000, 1);
            const oauthSub = await validateJWT(req.headers?.["authorization"]);
            await uploadMemberProfilePicture(files[0], oauthSub);
        } catch (error: any) {
            context.log.error(error.message);
            context.res = generateErrorResponse(error);
        }
    } else {
        context.res = generateValidationErrorResponse(validationErrors);
    }
}

export default uploadMemberProfilePictureFunction;