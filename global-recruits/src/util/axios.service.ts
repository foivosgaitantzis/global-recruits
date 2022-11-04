import axios, { Axios, AxiosRequestConfig, AxiosResponse, ResponseType } from "axios";
import { GetDiscordAccessToken, getRefreshTokenDetailsFromSource } from "./auth.service";

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

/**
 * Custom GET Function that Interfaces with API (or Custom Base URL), 
 * Retrieves Access Token & Refreshes It on Demand 
 * @param baseUrl The Custom Base URL (or undefined for API URL)
 * @param featureUrl The Feature URL ex. /auth
 * @param queryParameters Custom Query Parameters Array 
 * @returns The Request's Response
 */
export async function get(
    baseUrl: string | undefined,
    featureUrl: string,
    queryParameters?: any,
    responseType?: ResponseType
): Promise<AxiosResponse> {
    const discordTokenDetailsText = localStorage.getItem("DiscordTokenDetails");
    const discordTokenDetails: GetDiscordAccessToken = JSON.parse(discordTokenDetailsText ?? "{}");
    try {
        const response = await axios.get(
            (baseUrl ?? apiBaseUrl) + featureUrl,
            {
                params: { ...queryParameters },
                headers: {
                    "Authorization": "Bearer " + (discordTokenDetails.access_token ?? "")
                },
                responseType
            }
        );
        return response;
    } catch (error: any) {
        if (axios.isAxiosError(error) && error.status === "401") {
            try {
                const freshAccessToken = await getRefreshTokenDetailsFromSource();
                const response = await axios.get(
                    (baseUrl ?? apiBaseUrl) + featureUrl,
                    {
                        params: { ...queryParameters },
                        headers: {
                            "Authorization": "Bearer " + (freshAccessToken ?? "")
                        },
                        responseType
                    }
                );
                return response;
            } catch (error: any) {
                throw error;
            }
        } else {
            throw error;
        }
    }
}

/**
 * Custom POST Function that Interfaces with API (or Custom Base URL), 
 * Retrieves Access Token & Refreshes It on Demand 
 * @param baseUrl The Custom Base URL (or undefined for API URL)
 * @param featureUrl The Feature URL ex. /auth
 * @param data The POST Payload
 * @param additionalHeaderData Any Custom Headers to be Included with the Request
 * @param queryParameters Custom Query Parameters Array 
 * @returns The Request's Response
 */
 export async function patch(
    baseUrl: string | undefined,
    featureUrl: string,
    data: any,
    additionalHeaderData?: any,
    queryParameters?: any
): Promise<AxiosResponse> {
    const discordTokenDetailsText = localStorage.getItem("DiscordTokenDetails");
    const discordTokenDetails: GetDiscordAccessToken = JSON.parse(discordTokenDetailsText ?? "{}");
    const localHeaders = { 
        "Content-Type": "application/json",
        "Authorization": "Bearer " + (discordTokenDetails.access_token ?? "")
    };
    try {
        const response = await axios.patch(
            (baseUrl ?? apiBaseUrl) + featureUrl,
            data,
            {
                params: { ...queryParameters },
                headers: { ...localHeaders, ...additionalHeaderData }
            }
        );
        return response;
    } catch (error: any) {
        if (axios.isAxiosError(error) && error.status === "401") {
            try {
                const freshAccessToken = await getRefreshTokenDetailsFromSource();
                localHeaders.Authorization = "Bearer " + (freshAccessToken ?? "");
                const response = await axios.patch(
                    (baseUrl ?? apiBaseUrl) + featureUrl,
                    data,
                    {
                        params: { ...queryParameters },
                        headers: { ...localHeaders, ...additionalHeaderData }
                    }
                );
                return response;
            } catch (error: any) {
                throw error;
            }
        } else {
            throw error;
        }
    }
}

/**
 * Custom POST Function that Interfaces with API (or Custom Base URL), 
 * Retrieves Access Token & Refreshes It on Demand 
 * @param baseUrl The Custom Base URL (or undefined for API URL)
 * @param featureUrl The Feature URL ex. /auth
 * @param data The POST Payload
 * @param additionalHeaderData Any Custom Headers to be Included with the Request
 * @param queryParameters Custom Query Parameters Array 
 * @returns The Request's Response
 */
 export async function post(
    baseUrl: string | undefined,
    featureUrl: string,
    data: any,
    additionalHeaderData?: any,
    queryParameters?: any
): Promise<AxiosResponse> {
    const discordTokenDetailsText = localStorage.getItem("DiscordTokenDetails");
    const discordTokenDetails: GetDiscordAccessToken = JSON.parse(discordTokenDetailsText ?? "{}");
    const localHeaders = { 
        "Content-Type": "application/json",
        "Authorization": "Bearer " + (discordTokenDetails.access_token ?? "")
    };
    try {
        const response = await axios.post(
            (baseUrl ?? apiBaseUrl) + featureUrl,
            data,
            {
                params: { ...queryParameters },
                headers: { ...localHeaders, ...additionalHeaderData }
            }
        );
        return response;
    } catch (error: any) {
        if (axios.isAxiosError(error) && error.status === "401") {
            try {
                const freshAccessToken = await getRefreshTokenDetailsFromSource();
                localHeaders.Authorization = "Bearer " + (freshAccessToken ?? "");
                const response = await axios.post(
                    (baseUrl ?? apiBaseUrl) + featureUrl,
                    data,
                    {
                        params: { ...queryParameters },
                        headers: { ...localHeaders, ...additionalHeaderData }
                    }
                );
                return response;
            } catch (error: any) {
                throw error;
            }
        } else {
            throw error;
        }
    }
}