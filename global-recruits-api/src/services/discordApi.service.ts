import axios from "axios";
import { ForbiddenError, UnauthorizedError } from "../errors/CustomErrors";
import { generateConfigurationErrorMessage } from "../helpers/errorGenerator";
import { DiscordGuildMemberResponse } from "../models/DiscordGuildMemberResponse";
import { DiscordUserResponse } from "../models/DiscordUserResponse";

const discordApiUrl = process.env["DISCORD_APIURL"];
const discordGuildId = process.env["DISCORD_GUILDID"];
const discordBotToken = process.env["DISCORD_BOTTOKEN"];
if (!discordApiUrl) {
    throw new Error(generateConfigurationErrorMessage("DISCORD_APIURL"));
}
if (!discordGuildId) {
    throw new Error(generateConfigurationErrorMessage("DISCORD_GUILDID"));
}
if (!discordBotToken) {
    throw new Error(generateConfigurationErrorMessage("DISCORD_BOTTOKEN"));
}

/**
 * Utility Function that Gets Discord User Object using their OAuthToken
 * @param oauthToken The User's OAuthToken
 * @returns The Discord User Object
 */
export async function getUserData(oauthToken: string): Promise<DiscordUserResponse> {
    try {
        const response = await axios.get(discordApiUrl + "/users/@me", {
            headers: {
                Authorization: "Bearer " + oauthToken
            }
        });
        return response.data as DiscordUserResponse;
    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            if (error.response.status === 401) {
                throw new UnauthorizedError("User is NOT Authorized to view this request");
            }
        }
        throw error;
    }
}

/**
 * Utility Function that Gets a Guild Member Object using a Bot through the User's ID
 * @param userId The User ID to get the Data For
 * @returns A Guild Member Object
 */
export async function getGuildMemberData(userId: string): Promise<DiscordGuildMemberResponse> {
    const response = await axios.get(discordApiUrl + '/guilds/' + discordGuildId + '/members/' + userId + "1234", {
        headers: {
            Authorization: "Bot " + discordBotToken
        }
    });
    return response.data as DiscordGuildMemberResponse;
}