import Stripe from 'stripe';
import { StripeError } from '../errors/CustomErrors';
import { generateConfigurationErrorMessage } from '../helpers/errorGenerator';

const stripeSecretKey = process.env["STRIPE_SECRETKEY"];
if (!stripeSecretKey) {
    throw new Error(generateConfigurationErrorMessage("STRIPE_SECRETKEY"));
}

const stripe = new Stripe(stripeSecretKey, {
    apiVersion: "2022-08-01"
});


/**
 * Service Function that Creates a New Stripe Customer
 * @param data The Mapped Stripe CustomerCreateParams Object
 */
export async function createStripeCustomer(data: Stripe.CustomerCreateParams): Promise<void> {
    try {
        const newCustomer = await stripe.customers.create(data);
        console.log(newCustomer)
        while (!(await getStripeCustomerFromDiscordUserId(data.metadata["discordUserId"]))) {
            // 
        }
        return;
    } catch (error: any) {
        throw new StripeError(error.message);
    }
}

/**
 * Service Function that Retrieves a Customer Record 
 * using the Discord User ID Relationship
 * @param discordUserId The Discord User ID (Relationship)
 * @returns The Stripe Customer Entity
 */
export async function getStripeCustomerFromDiscordUserId(discordUserId: string): Promise<Stripe.Customer|undefined> {
    try {
        const customer = await stripe.customers.search({
            query: 'metadata[\'discordUserId\']:\'' + discordUserId + '\''
        });
        if (customer.data.length === 0) {
            return undefined;
        }
        if (customer.has_more || customer.data.length > 1) {
            throw new StripeError("More than one Stripe Customer was found with this Discord ID");
        }
        return customer.data[0];
    } catch (error: any) {
        throw new StripeError(error.message);
    }
}