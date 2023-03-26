import { ApiBaseUrl } from "../helpers/loadEnvironmentVariables";
import { Api, GetAthleteDetailsResponse, MemberIdMeParameter } from "../specification/GlobalRecruits";
import { UserModel } from "../state/models/User";
import { Buffer } from "buffer";
import { createElement } from "react";
import { ProfilePictureModel } from "../state/models/ProfilePictureModel";

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
 * Utility Function that Creates an Image HTML Element from a Picture File
 * @param file The Picture File
 * @returns The HTML Image Element
 */
export async function createPictureElement(file: File) {
    const arrayBuffer = await file?.arrayBuffer();
    const buffer =  Buffer.from(arrayBuffer as any, "base64");
    return createElement(
        "img",
        {
            className: "w-full h-full object-cover object-center",
            src: "data:;base64," + buffer.toString('base64'),
        },
      )
}

/**
 * Service Function that Loads Member's Profile Picture (Buffer)
 * @returns The Image as Buffer or undefined
 */
export async function loadProfilePicture(): Promise<ProfilePictureModel | undefined> {
    const api = new Api({
        baseURL: ApiBaseUrl,
        responseType: "blob"
    });
    // Load Profile Picture
    const response = await api.members.getMemberProfilePicture(MemberIdMeParameter.TypeMe);
    const element = await createPictureElement(response.data);
    return {
        file: response.data,
        image: element
    };
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