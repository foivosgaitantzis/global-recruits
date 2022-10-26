import axios from "axios";
import { generateConfigurationErrorMessage } from "../helpers/errorGenerator";
import { GetDiscordAccessTokenResponse } from "../models/GlobalRecruits";

const APIENDPOINT = "https://discord.com/api/v10";

const discordClientId = process.env["DISCORD_CLIENTID"];
const discordClientSecret = process.env["DISCORD_CLIENTSECRET"];
const discordRedirectUri = process.env["DISCORD_REDIRECTURI"];

if (!discordClientId) {
    throw new Error(generateConfigurationErrorMessage("DISCORD_CLIENTID"));
}

if (!discordClientSecret) {
    throw new Error(generateConfigurationErrorMessage("DISCORD_CLIENTSECRET"));
}

if (!discordRedirectUri) {
    throw new Error(generateConfigurationErrorMessage("DISCORD_REDIRECTURI"));
}

/**
 * Service Function that Retrieves/Refreshes a Discord Access Token
 * @param grantType The Grant Type ex. authorization_code
 * @param headers The req.headers Object
 * @returns The Discord Access Token Response Body
 */
export async function getDiscordAccessToken(grantType: "authorization_code" | "refresh_token", headers: any): Promise<GetDiscordAccessTokenResponse> {
    if (grantType === "authorization_code" && headers['x-authorization-code']) {
        return await getDiscordAccessTokenFromAuthorizationCode(headers['x-authorization-code']);
    } else if (grantType === "refresh_token" && headers['x-refresh-token']) {
        return await getDiscordAccessTokenFromRefreshToken(headers['x-refresh-token'])
    }
}

/**
 * Service Function that Retrieves a Discord Access Token from an Authorization Code
 * @param authorizationCode The Authorization Code from the Callback
 * @returns The Discord Access Token Response Body
 */
async function getDiscordAccessTokenFromAuthorizationCode(authorizationCode: string): Promise<GetDiscordAccessTokenResponse> {
    const data = new URLSearchParams([
        ["client_id", discordClientId],
        ["client_secret", discordClientSecret],
        ["grant_type", "authorization_code"],
        ["code", authorizationCode],
        ["redirect_uri", discordRedirectUri]
    ]);
    const response = await axios.post(
        APIENDPOINT + '/oauth2/token',
        data.toString(),
        {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }
    );

    return response.data as GetDiscordAccessTokenResponse;
}

/**
 * Service Function that Renews a Discord Access Token from a Refresh Token
 * @param refreshToken The Refresh Token
 * @returns The Discord Access Token Response Body
 */
async function getDiscordAccessTokenFromRefreshToken(refreshToken: string): Promise<GetDiscordAccessTokenResponse> {
    const data = new URLSearchParams([
        ["client_id", discordClientId],
        ["client_secret", discordClientSecret],
        ["grant_type", "refresh_token"],
        ["refresh_token", refreshToken]
    ]);
    const response = await axios.post(
        APIENDPOINT + '/oauth2/token',
        data.toString(),
        {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }
    );

    return response.data as GetDiscordAccessTokenResponse;
}