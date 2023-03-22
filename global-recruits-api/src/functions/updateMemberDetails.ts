import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { generateErrorResponse, generateValidationErrorResponse } from "../errors/helper";
import { ValidationErrorsResponse, UpdateAthleteDetailsRequestBody, UpdateStaffDetailsRequestBody } from "../models/GlobalRecruits";
import { updateMemberDetails } from "../services/updateMember.service";
import { validateJWT } from "../validation/bearerToken";
import { getOpenApiPath, getParameterSchemas, getRequestBodySchema, validateSchemaTuples } from "../validation/schemaValidation";

/**
 * Update Member Azure Function
 */
const updateMemberDetailsFunction: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    // Schema Validation
    const requestBody: UpdateAthleteDetailsRequestBody | UpdateStaffDetailsRequestBody = req.body;
    const pathSchema = getOpenApiPath("/members/{memberId}", "patch");
    const requestBodySchema = getRequestBodySchema(pathSchema);
    const parameterSchema = getParameterSchemas(pathSchema, "path");
    const validationErrors: ValidationErrorsResponse = validateSchemaTuples(
        [requestBody, requestBodySchema],
        [req?.params, parameterSchema]
    );

    if (validationErrors.length <= 0) {
        try {
            const oauthSub = await validateJWT(req.headers?.["authorization"]);
            const memberId: string = req.params['memberId'];
            await updateMemberDetails(requestBody, oauthSub, memberId);
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

export default updateMemberDetailsFunction;