import { ApiBaseUrl } from "../helpers/loadEnvironmentVariables";
import { Api, GetAthleteDetailsResponse, MemberIdMeParameter } from "../specification/GlobalRecruits";
import { UserModel } from "../state/models/User";
import { Buffer } from "buffer";

/**
 * Service Function that Loads Member's Database Data
 * @returns The Member's Data as JSON
 */
export async function loadMemberDetails(): Promise<UserModel> {
    const api = new Api({
        baseURL: ApiBaseUrl
    });
    // Load Database Data
    const response = await api.members.getMemberDetails(MemberIdMeParameter.TypeMe);
    return response.data;
}

/**
 * Service Function that Loads Member's Profile Picture (Buffer)
 * @returns The Image as Buffer or undefined
 */
export async function loadProfilePicture(): Promise<File | undefined> {
    const api = new Api({
        baseURL: ApiBaseUrl,
        responseType: "blob"
    });
    // Load Profile Picture
    const response = await api.members.getMemberProfilePicture(MemberIdMeParameter.TypeMe);
    return response.data;
    /*if (response.data) {
        const buffer = Buffer.from(response.data as any, 'base64');
        return buffer;
    }*/
}

/**
 * Utility Function that Retrieves the Onboarding Page
 * @param userData T
 * @returns 
 */
export function getOnboardingPage(userData: UserModel): (number | undefined) {
    if (userData.type === "athlete") {
        const data = userData as GetAthleteDetailsResponse;
        if (data.data.firstName && data.data.lastName
            && data.data.dateOfBirth && data.data.country
            && data.data.city && data.data.height
            && data.data.weight) {
            if (data.data.teams && data.data.teams.length > 0) {
                return 2;
            }
            return 2;
        }
        return 1;
    }
}