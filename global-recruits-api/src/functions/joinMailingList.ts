import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { generateValidationErrorResponse } from "../errors/helper";
import { JoinMailingListRequestBody, ValidationErrorsResponse } from "../models/GlobalRecruits";
import { createMailChimpContact } from "../services/mailchimp.service";
import { getOpenApiPath, getRequestBodySchema, validateSchemaTuples } from "../validation/schemaValidation";

/**
 * Join MailChimp Mailing List Azure Function
 */
const joinMailingListFunction: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    // Schema Validation
    const requestBody: JoinMailingListRequestBody = req.body;
    const pathSchema = getOpenApiPath("/mailinglist", "post");
    const requestBodySchema = getRequestBodySchema(pathSchema);
    const validationErrors: ValidationErrorsResponse = validateSchemaTuples([requestBody, requestBodySchema]);

    if (validationErrors.length <= 0) {
        try {
            await createMailChimpContact(requestBody);
            context.res = {
                status: 201
            }
        } catch (error: any) {
            const responseData = JSON.parse(error.response.text);
            context.log.error(responseData ?? error.message);
            context.res = {
                headers: {
                    'Content-Type': 'application/json'
                },
                status: error.status ?? "500",
                body: {
                    title: responseData?.title ?? "An Unexpected Error Occured",
                    detail: responseData?.detail,
                    instance: responseData?.instance
                }
            }
        }

    } else {
        context.res = generateValidationErrorResponse(validationErrors);
    }
}

export default joinMailingListFunction;