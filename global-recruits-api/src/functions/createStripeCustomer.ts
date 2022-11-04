import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import Stripe from "stripe";
import { MemberAlreadyExistsError } from "../errors/CustomErrors";
import { generateErrorResponse } from "../errors/helper";
import { mapRegisterToCreateCustomer } from "../maps/stripe.map";
import { DiscordUserResponse } from "../models/DiscordUserResponse";
import { CreateStripeCustomerRequestBody, JoinMailingListRequestBody, ValidationErrorsResponse } from "../models/GlobalRecruits";
import { getUserData } from "../services/discordApi.service";
import { createStripeCustomer, getStripeCustomerFromDiscordUserId } from "../services/stripe.service";
import { validateBearerToken } from "../validation/bearerToken";
import { getOpenApiPath, getRequestBodySchema, validateSchemaTuples } from "../validation/schemaValidation";

/**
 * Create Stripe Customer Azure Function
 */
const createStripeCustomerFunction: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    // Schema Validation
    const requestBody: CreateStripeCustomerRequestBody = req.body;
    const pathSchema = getOpenApiPath("/member", "post");
    const requestBodySchema = getRequestBodySchema(pathSchema);
    const validationErrors: ValidationErrorsResponse = validateSchemaTuples([requestBody, requestBodySchema]);

    // Validate Bearer Token
    validationErrors.push(...validateBearerToken(req.headers));

    if (validationErrors.length <= 0) {
        try {
            // Extract User ID and Check if User Already Exists
            const userData: DiscordUserResponse = await getUserData(req.headers['authorization']);
            const checkCustomerExists = await getStripeCustomerFromDiscordUserId(userData.id);
            if (checkCustomerExists) {
                throw new MemberAlreadyExistsError("The User is Already Registered on Stripe");
            }

            // Create the Customer on Stripe
            const createStripeCustomerMap: Stripe.CustomerCreateParams = mapRegisterToCreateCustomer(requestBody, userData.id);
            await createStripeCustomer(createStripeCustomerMap);

            // Return a Created Response
            context.res = {
                status: 201
            };
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

export default createStripeCustomerFunction;