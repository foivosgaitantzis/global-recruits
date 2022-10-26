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

export async function navigateToDiscordLogin(route?: string) {
    if (!discordClientId || !discordApiUrl || !discordRedirectUri) {
        return;
    }
    const stateParameter = nanoid();
    localStorage.setItem(stateParameter, route ?? "/profile");
    
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

export async function setTokenDetailsFromSource(code: string) {
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
        console.log("PROBLEM");
    }
}