import axios, { AxiosResponse } from "axios";
import { features } from "process";

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
const discordOAuth2URL = "";

export async function get(
    baseUrl: string | undefined,
    featureUrl: string,
    queryParameters?: any
): Promise<AxiosResponse> {
    try {
        const response = await axios.get(
            (baseUrl ?? apiBaseUrl) + featureUrl, 
            {
                params: { ...queryParameters }
            }
        )
        return response;
    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            if (error.status === "401") {
                try { 
                } catch (error: any) {
                    throw error;
                }
                // 
            }
            throw new Error("asdf")
        } else {
            throw error;
        }
    }
}