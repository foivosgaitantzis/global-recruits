import { UserType } from "./UserType.enum"

/**
 * The User Model (Inspired from Cognito)
 */
export interface UserModel {
    pgUserType: UserType,
    username: string,
    attributes: {
        sub: string,
        email: string,
        name: string
    },
    signInUserSession: {
        idToken: {
            jwtToken: string
        },
        refreshToken: {
            token: string
        },
        accessToken: {
            jwtToken: string
        }
    }
}