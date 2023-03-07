import { MailchimpApiKey, MailchimpAudienceId, MailchimpServer } from "../helpers/loadEnvironmentVariables";
import { JoinMailingListRequestBody } from "../models/GlobalRecruits";

var mailchimp = require("@mailchimp/mailchimp_marketing");

mailchimp.setConfig({
    apiKey: MailchimpApiKey,
    server: MailchimpServer
});

/**
 * Service Functions that Creates a Subscribed MailChimp Contact
 * @param requestBody The POST /mailinglist Request Body
 */
export async function createMailChimpContact(requestBody: JoinMailingListRequestBody) {
    await mailchimp.lists.addListMember(MailchimpAudienceId, {
        "email_address": requestBody.data.emailAddress,
        "status": "subscribed"
    });
}