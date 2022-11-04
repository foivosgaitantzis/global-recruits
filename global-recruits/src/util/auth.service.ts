import axios from 'axios';
import { nanoid } from 'nanoid';

export interface GetDiscordAccessToken {
    access_token: string,
    token_type: string,
    expires_in: number,
    refresh_token: string,
    scope: string
}

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
const discordApiUrl = process.env.REACT_APP_DISCORD_API_URL;
const discordClientId = process.env.REACT_APP_DISCORD_CLIENTID;
const discordRedirectUri = process.env.REACT_APP_DISCORD_REDIRECTURI;

/**
 * Navigate to the Discord Authentication Page
 */
export async function navigateToDiscordLogin() {
    if (!discordClientId || !discordApiUrl || !discordRedirectUri) {
        return;
    }
    const path = !window.location.pathname || window.location.pathname === "/"
        ? "/profile"
        : window.location.pathname;

    const stateParameter = nanoid();
    localStorage.setItem(stateParameter, path);

    const query = {
        client_id: discordClientId,
        redirect_uri: discordRedirectUri,
        response_type: "code",
        scope: "identify email guilds guilds.join",
        state: stateParameter
    }

    const encodedQueryString = new URLSearchParams(query).toString();
    window.location.href = discordApiUrl + "/oauth2/authorize?" + encodedQueryString;
}

/**
 * Utility Function that Gets Bearer Token from API
 * @param code The code Query Parameter in the Callback URL
 */
export async function getTokenDetailsFromSource(code: string): Promise<string | undefined> {
    if (!apiBaseUrl) {
        return;
    }
    try {
        const response = await axios.post(
            apiBaseUrl + "/auth?grantType=authorization_code",
            undefined,
            {
                headers: {
                    "X-Authorization-Code": code
                }
            }
        );
        const discordTokenDetails: GetDiscordAccessToken = response.data;
        if (discordTokenDetails) {
            localStorage.setItem("DiscordTokenDetails", JSON.stringify(discordTokenDetails));
        }
        return discordTokenDetails?.access_token;
    } catch (error: any) {
        // Do Nothing
        return;
    }
}

/**
 * Utility Function that Refreshes Bearer Token from API
 */
export async function getRefreshTokenDetailsFromSource() {
    const discordTokenDetailsText = localStorage.getItem("DiscordTokenDetails");
    if (!apiBaseUrl || !discordTokenDetailsText) {
        return;
    }
    const discordTokenDetails: GetDiscordAccessToken = JSON.parse(discordTokenDetailsText);
    try {
        const response = await axios.post(
            apiBaseUrl + "/auth?grantType=refresh_token",
            undefined,
            {
                headers: {
                    "X-Refresh-Token": discordTokenDetails.refresh_token
                }
            }
        );
        console.log("Previous Token: " + discordTokenDetails.access_token);
        const freshDiscordTokenDetails: GetDiscordAccessToken = response.data;
        if (freshDiscordTokenDetails) {
            localStorage.setItem("DiscordTokenDetails", JSON.stringify(freshDiscordTokenDetails));                      
        }
        console.log("New Token: " + freshDiscordTokenDetails.access_token);
        return freshDiscordTokenDetails?.access_token;
    } catch (error: any) {
        // Do Nothing
        return;
    }
}