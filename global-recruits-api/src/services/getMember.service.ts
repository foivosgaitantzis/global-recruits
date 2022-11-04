import { NotFoundError } from "../errors/CustomErrors";
import { GetMemberDataResponse } from "../models/GlobalRecruits";
import { getGuildMemberData, getUserData } from "./discordApi.service";
import { getStripeCustomerFromDiscordUserId } from "./stripe.service";

/**
 * Get Member Data Service
 * @param oauthToken The Discord OAuth Token
 * @param expand Optional Expandables to Include Extra Data
 * @returns The Member's Data
 */
export async function getMemberData(oauthToken: string, expand?: ("paymentMethod" | "subscription" | "guildRoles")[]): Promise<GetMemberDataResponse> {
    const userData = await getUserData(oauthToken);
    const stripeCustomer = await getStripeCustomerFromDiscordUserId(userData.id);
    if (!stripeCustomer || !stripeCustomer.name) {
        throw new NotFoundError("This Customer was NOT Found on Stripe.");
    }
    const [firstName, lastName] = stripeCustomer.name.split(' ');
    const response: GetMemberDataResponse = {
        data: {
            discordUserId: userData.id,
            stripeCustomerId: stripeCustomer.id,
            firstName,
            lastName
        }
    }
    if (expand && expand.includes("guildRoles")) {
        const guildUserData = await getGuildMemberData(userData.id);
        response.data.guildRoles = [];
        guildUserData.roles.forEach((roleId: string) => {
            const roleName = process.env["DISCORD_GUILDROLE_" + roleId];
            if (roleName) {
                response.data.guildRoles.push(roleName);
            } else {
                console.log("The Role ID was NOT Found in Environment Variables");
            }
        });
    }
    return response;
}