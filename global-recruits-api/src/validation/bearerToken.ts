import { generateValidationError } from "../helpers/errorGenerator";

/**
 * General Function
 * @param headers 
 * @returns 
 */
export function validateBearerToken(headers: any) {
    if (!headers['authorization']) {
        return generateValidationError("must have required header 'Authorization' (Bearer Token)")
    }
    return [];
}