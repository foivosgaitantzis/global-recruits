import axios from "axios";
import { JWTVerifyOptions, createLocalJWKSet, jwtVerify, KeyLike } from "jose";
import { PoolClient } from "pg";
import { UserRepository } from "../data_access/modules/User";
import { CognitoError, ExpiredTokenError, ForbiddenError, InvalidTokenError, MissingTokenError, PostgresError } from "../errors/CustomErrors";
import { CognitoIssuerHost, CognitoUserpoolId } from "../helpers/loadEnvironmentVariables";
import { MemberIdMeParameter, MemberType } from "../models/GlobalRecruits";

const userRepository = new UserRepository();

/**
 * Utility Function that Strips the word 'Bearer' from the Authorization Header
 * @param authorizationHeader The Authorization Header Value ex. 'Bearer ...'
 * @returns The Authorization Header Token
 */
function stripBearerPrefix(authorizationHeader: string): string {
    const BEARER_PREFIX = "BEARER ";
    let token = authorizationHeader;
    if (authorizationHeader.toUpperCase().startsWith(BEARER_PREFIX)) {
        token = authorizationHeader.substring(BEARER_PREFIX.length);
    }
    return token;
}

/**
 * Utility Function that Fetches the User Role using an OAuthSub
 * @param tx The Postgres Connected Client
 * @param oauthSub The OAuthSub of the User to Get Role
 * @returns Returns the Role of the Useraaaa
 */
export async function getUserRole(tx: PoolClient, oauthSub: string): Promise<MemberType> {
    try {
        const userSearch = await userRepository.find({
            oauthSub
        }, { tx });
        const user = userSearch?.[0];
        if (user) {
            return user.type as MemberType;
        } else {
            throw new ForbiddenError("Could NOT Find User");
        }
    } catch (error: any) {
        if (error instanceof ForbiddenError) {
            throw error;
        }
        throw new PostgresError(error.message);
    }
}

/**
 * Get Member Access 
 * @param tx The Pool Client
 * @param oauthSub The OAuthSub of the Logged in User
 * @param userId The User ID to Fetch (MemberId)
 * @param allowedAccessMembers The Roles Allowed to Access ALL User IDs (ex. [Administrator, Staff])
 * @returns The User ID
 */
export async function getMemberAccess(tx: PoolClient, oauthSub: string, userId: string, allowedAccessMembers: MemberType[]): Promise<string> {
    try {
        const meSearch = await userRepository.find({
            oauthSub
        }, { tx });
        if (!(meSearch && meSearch.length > 0)) {
            throw new ForbiddenError("You are not a Valid User");
        }
        if (userId === MemberIdMeParameter.TypeMe) {
            return meSearch[0].userId;
        } else {
            if (userId === meSearch[0].userId) {
                return userId;
            } else {
                if (allowedAccessMembers.includes(meSearch[0].type)) {
                    return userId;
                } else {
                    throw new ForbiddenError("You are not allowed to Access this");
                }
            }
        }
    } catch (error: any) {
        if (error instanceof ForbiddenError) {
            throw error;
        }
        throw new PostgresError(error.message);
    }
}

/**
 * Validate JSON Web Token
 * @param authorizationHeader The Authorization Header Value ex. 'Bearer ...'
 */
export async function validateJWT(authorizationHeader: string | undefined): Promise<string> {
    if (!authorizationHeader) {
        throw new MissingTokenError("No Authorization Header Found");
    }
    const token = stripBearerPrefix(authorizationHeader);
    const issuerUrl = CognitoIssuerHost + "/" + CognitoUserpoolId;
    const options: JWTVerifyOptions = {
        algorithms: ['RS256'],
        clockTolerance: 5,
        issuer: issuerUrl
    };
    let jwksFunction: (protectedHeader?: any, token?: any) => Promise<KeyLike>;
    try {
        const response = await axios.get(issuerUrl + "/.well-known/jwks.json");
        jwksFunction = createLocalJWKSet(response.data);
    } catch (error: any) {
        throw new CognitoError("Error Retrieving JWKS JSON: " + error.message);
    }
    if (jwksFunction) {
        try {
            const response = await jwtVerify(token, jwksFunction, options);
            if (response.payload.sub) {
                return response.payload.sub;
            } else {
                throw new CognitoError("Could NOT Stringify JWKS JSON Data");
            }
        } catch (error: any) {
            if (error.code === "ERR_JWT_EXPIRED") {
                throw new ExpiredTokenError(error.message);
            } else if (error.code === "ERR_JWT_INVALID") {
                throw new InvalidTokenError(error.message);
            } else if (error.code === "ERR_JWS_INVALID") {
                throw new InvalidTokenError(error.message);
            }
            throw new CognitoError((error.code ?? "Unknown Error") + ": " + error.message);
        }
    } else {
        throw new CognitoError("Could NOT Create JWKS Function");
    }
}