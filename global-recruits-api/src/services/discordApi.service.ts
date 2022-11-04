import axios, { AxiosResponse } from "axios";
import { DiscordError, ForbiddenError, NotFoundError, UnauthorizedError } from "../errors/CustomErrors";
import { generateConfigurationErrorMessage } from "../helpers/errorGenerator";
import { DiscordGuildMemberResponse } from "../models/DiscordGuildMemberResponse";
import { DiscordUserResponse } from "../models/DiscordUserResponse";

const discordApiUrl = process.env["DISCORD_APIURL"];
const discordCdnApiUrl = process.env["DISCORD_CDNAPIURL"];
const discordGuildId = process.env["DISCORD_GUILDID"];
const discordBotToken = process.env["DISCORD_BOTTOKEN"];
if (!discordApiUrl) {
    throw new Error(generateConfigurationErrorMessage("DISCORD_APIURL"));
}
if (!discordCdnApiUrl) {
    throw new Error(generateConfigurationErrorMessage("DISCORD_CDNAPIURL"));
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
                Authorization: oauthToken
            }
        });
        return response.data as DiscordUserResponse;
    } catch (error: any) {
        if (axios.isAxiosError(error) && error.response.status === 401) {
            throw new UnauthorizedError("User is NOT Authorized to view this request");
        }
        throw new DiscordError(error.message);
    }
}

/**
 * Utility Function that Gets Discord Avatar Picture
 * @param oauthToken The User's OAuthToken
 * @param discordUserId The User's Discord User ID
 * @param discordAvatarId The User's Discord Avatar ID
 * @returns The Discord User Object
 */
export async function getUserAvatar(oauthToken: string, discordUserId: string, discordAvatarId?: string): Promise<AxiosResponse<File>> {
    if (!discordAvatarId) {
        throw new NotFoundError("This User does NOT have an Avatar")
    }
    try {
        const response = await axios.get(discordCdnApiUrl + "/avatars/" + discordUserId + "/" + discordAvatarId, {
            headers: {
                Authorization: oauthToken
            },
            responseType: "arraybuffer"
        });
        return response.data;
    } catch (error: any) {
        if (axios.isAxiosError(error) && error.response.status === 401) {
            throw new UnauthorizedError("User is NOT Authorized to view this request");
        }
        throw new DiscordError(error.message);
    }
}

/**
 * Utility Function that Gets a Guild Member Object using a Bot through the User's ID
 * @param discordUserId The Discord User ID to get the Data For
 * @returns A Guild Member Object
 */
export async function getGuildMemberData(discordUserId: string): Promise<DiscordGuildMemberResponse> {
    try {
        const response = await axios.get(discordApiUrl + '/guilds/' + discordGuildId + '/members/' + discordUserId + "1234", {
            headers: {
                Authorization: "Bot " + discordBotToken
            }
        });
        return response.data as DiscordGuildMemberResponse;
    } catch (error: any) {
        if (axios.isAxiosError(error) && error.response.status === 400) {
            throw new NotFoundError("The User is NOT in the Guild")
        }
        throw new DiscordError(error.message);
    }
}