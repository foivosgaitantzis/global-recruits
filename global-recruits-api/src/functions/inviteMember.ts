import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { generateErrorResponse, generateValidationErrorResponse } from "../errors/helper";
import { ValidationErrorsResponse, InviteMemberRequestBody } from "../models/GlobalRecruits";
import { createCognitoUser } from "../services/cognito.service";
import { createUser } from "../services/inviteMember.service";
import { getOpenApiPath, getRequestBodySchema, validateSchemaTuples } from "../validation/schemaValidation";

/**
 * Invite Member Azure Function
 */
const inviteMemberFunction: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    // Schema Validation
    const requestBody: InviteMemberRequestBody = req.body;
    const pathSchema = getOpenApiPath("/members/invite", "post");
    const requestBodySchema = getRequestBodySchema(pathSchema);
    const validationErrors: ValidationErrorsResponse = validateSchemaTuples([requestBody, requestBodySchema]);

    if (validationErrors.length <= 0) {
        try {
            const sub = await createCognitoUser(requestBody.data.emailAddress);
            if (sub) {
                await createUser(requestBody.data.emailAddress, sub, requestBody.type);
            }
            context.res = {
                status: 201
            }
        } catch (error: any) {
            context.log.error(error.message);
            context.res = generateErrorResponse(error);
        }
    } else {
        context.res = generateValidationErrorResponse(validationErrors);
    }
}

export default inviteMemberFunction;