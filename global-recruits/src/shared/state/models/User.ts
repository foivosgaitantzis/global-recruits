import { GetAthleteDetailsResponse, GetStaffDetailsResponse } from "../../specification/GlobalRecruits"

/**
 * The User Model (Inspired from Cognito)
 */
interface CognitoUserModel {
    username: string,
    attributes: {
        sub: string,
        email: string,
        name: string
    }
}

export type UserModel = GetAthleteDetailsResponse | GetStaffDetailsResponse;