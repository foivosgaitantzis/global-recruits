import Stripe from 'stripe';
import { CreateStripeCustomerRequestBody } from '../models/GlobalRecruits';

/**
 * Maps Register DTO -> Stripe Create Customer DTO
 * @param data The Registration Data (POST /register)
 * @param discordUserId The Discord User ID (Relationship)
 * @returns The Mapped DTO
 */
export function mapRegisterToCreateCustomer(data: CreateStripeCustomerRequestBody, discordUserId: string): Stripe.CustomerCreateParams {
    return <Stripe.CustomerCreateParams> {
        name: data.data.firstName + " " + data.data.lastName,
        email: data.data.emailAddress,
        metadata: {
            discordUserId
        }
    }
}