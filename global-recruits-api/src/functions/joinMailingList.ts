import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { createMailChimpContact } from "../services/mailchimp.service";

/**
 * Join MailChimp Mailing List Azure Function
 */
const joinMailingList: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    try {
        context.res = {
            headers: {
                'Content-Type': 'application/json'
            },
            status: 201,
            body: await createMailChimpContact(req.body.email_address)
        }
    } catch (error: any) {
        context.log.info(error.response.text);
        context.res = {
            headers: {
                'Content-Type': 'application/json'
            },
            status: error.status ?? "400",
            body: error.response.text ?? { error: "An Unexpected Error Occured" }
        }
    }
}

export default joinMailingList;