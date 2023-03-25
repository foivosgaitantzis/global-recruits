import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { generateErrorResponse, generateValidationErrorResponse } from "../errors/helper";
import { ValidationErrorsResponse } from "../models/GlobalRecruits";
import { getMemberDetails } from "../services/getMember.service";
import { validateJWT } from "../validation/bearerToken";
import { getOpenApiPath, getParameterSchemas, validateSchemaTuples } from "../validation/schemaValidation";
import intercept = require("azure-function-log-intercept");

/**
 * Get Member Azure Function
 */
const getMemberDetailsFunction: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    intercept(context);
    // Schema Validation
    const pathSchema = getOpenApiPath("/members/{memberId}", "get");
    const parameterSchema = getParameterSchemas(pathSchema, "path");
    const validationErrors: ValidationErrorsResponse = validateSchemaTuples([req?.params, parameterSchema]);
    if (validationErrors.length <= 0) {
        try {
            const oauthSub = await validateJWT(req.headers?.["authorization"]);
            const memberId: string = req.params['memberId'];
            const data = await getMemberDetails(oauthSub, memberId);
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
    } else {
        context.res = generateValidationErrorResponse(validationErrors);
    }
}

export default getMemberDetailsFunction;