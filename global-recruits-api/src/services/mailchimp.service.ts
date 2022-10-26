import { generateConfigurationErrorMessage } from "../helpers/errorGenerator";
import { JoinMailingListRequestBody } from "../models/GlobalRecruits";

var mailchimp = require("@mailchimp/mailchimp_marketing");

const mailChimpAPIKey = process.env["MAILCHIMP_APIKEY"];
const mailChimpServer = process.env["MAILCHIMP_SERVER"];
const mailChimpAudienceID = process.env["MAILCHIMP_AUDIENCEID"];

if (!mailChimpAPIKey) {
    throw new Error(generateConfigurationErrorMessage("MAILCHIMP_APIKEY"));
}

if (!mailChimpServer) {
    throw new Error(generateConfigurationErrorMessage("MAILCHIMP_SERVER"));
}

if (!mailChimpAudienceID) {
    throw new Error(generateConfigurationErrorMessage("MAILCHIMP_AUDIENCEID"));
}

mailchimp.setConfig({
    apiKey: mailChimpAPIKey,
    server: mailChimpServer
});

/**
 * Service Functions that Creates a Subscribed MailChimp Contact
 * @param requestBody The POST /mailinglist Request Body
 */
export async function createMailChimpContact(requestBody: JoinMailingListRequestBody) {
    await mailchimp.lists.addListMember(mailChimpAudienceID, {
        "email_address": requestBody.data.emailAddress,
        "status": "subscribed"
    });
}