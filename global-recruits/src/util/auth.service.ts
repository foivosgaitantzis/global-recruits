import axios from 'axios';
import { nanoid } from 'nanoid';
import { useNavigate, useSearchParams } from 'react-router-dom';

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
        scope: "email guilds guilds.join",
        state: stateParameter
    }

    const encodedQueryString = new URLSearchParams(query).toString();
    window.location.href = discordApiUrl + "/oauth2/authorize?" + encodedQueryString;
}

/**
 * Utility Function that Gets Bearer Token from API
 * @param code The code Query Parameter in the Callback URL
 */
export async function getTokenDetailsFromSource(code: string) {
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
        localStorage.setItem("DiscordTokenDetails", JSON.stringify(response.data));
    } catch (error: any) {
        
    }
}