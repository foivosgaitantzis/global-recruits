import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { generateErrorResponse } from "../errors/helper";
import { ValidationErrorsResponse } from "../models/GlobalRecruits";
import { getMemberData } from "../services/getMember.service";
import { validateBearerToken } from "../validation/bearerToken";
import { getOpenApiPath, getParameterSchemas, validateSchemaTuples } from "../validation/schemaValidation";

/**
 * Exchange OAuthToken to Blob Token Azure Function
 */
const getBlobTokenFunction: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    // Schema Validation
    const pathSchema = getOpenApiPath("/member", "get");
    const queryParametersSchema = getParameterSchemas(pathSchema, "query");
    // Convert 'Expand' Comma Seperated Parameter to an Array
    let queryParameters: any = req.query;
    if (queryParameters['expand']) {
        queryParameters['expand'] = queryParameters['expand'].split(',')
            .map((expandable: string) => expandable.trim());
    }
    const validationErrors: ValidationErrorsResponse = validateSchemaTuples(
        [queryParameters, queryParametersSchema]
    );

    // Validate Bearer Token
    validationErrors.push(...validateBearerToken(req.headers));

    if (validationErrors.length <= 0) {
        try {
            const memberData = await getMemberData(req.headers['authorization'], queryParameters['expand']);
            context.res = {
                headers: {
                    'Content-Type': 'application/json'
                },
                status: 200,
                body: memberData
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

export default getBlobTokenFunction;