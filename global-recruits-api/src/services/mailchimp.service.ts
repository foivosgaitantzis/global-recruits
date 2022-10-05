import { MailChimpContact } from "../models/MailChimpContact";

var mailchimp = require("@mailchimp/mailchimp_marketing");

const mailChimpAPIKey = process.env["MAILCHIMP_APIKEY"];
const mailChimpServer = process.env["MAILCHIMP_SERVER"];
const mailChimpAudienceID = process.env["MAILCHIMP_AUDIENCEID"]; // f0fc08e589

if (!mailChimpAPIKey) {
    throw new Error("Could not find the Environment Variable: [MAILCHIMP_APIKEY]");
}

if (!mailChimpServer) {
    throw new Error("Could not find the Environment Variable: [MAILCHIMP_SERVER]");
}

mailchimp.setConfig({
    apiKey: mailChimpAPIKey,
    server: mailChimpServer
});

/**
 * Service Functions that Creates a Subscribed MailChimp Contact
 * @param emailAddress The Email Address of the Contact
 * @returns The Member ID & Email Address of the Contact
 */
export async function createMailChimpContact(emailAddress: string): Promise<MailChimpContact> {
    if (!mailChimpAudienceID) {
        throw new Error("Could not find the Environment Variable: [MAILCHIMP_AUDIENCEID]");
    }
    const response = await mailchimp.lists.addListMember(mailChimpAudienceID, {
        "email_address": emailAddress,
        "status": "subscribed"
    });
    return <MailChimpContact>{
        id: response.id,
        emailAddress: response.email_address
    }
}