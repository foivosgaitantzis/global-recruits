import { generateValidationError } from "../helpers/errorGenerator";
import { ValidationErrorsResponse } from "../models/GlobalRecruits";

/**
 * Validates /auth Headers
 * @param grantType The Grant Type ex. authorization_code
 * @param headers The req.headers Object
 * @returns An Array of Validation Errors to be Returned 
 */
export function validateHeaders(grantType: "authorization_code" | "refresh_token", headers: any): ValidationErrorsResponse {
    if (grantType === "authorization_code" && !headers['x-authorization-code']) {
        return generateValidationError("must have required header 'X-Authorization-Code'")
    } else if (grantType === "refresh_token" && !headers['x-refresh-token']) {
        return generateValidationError("must have required header 'X-Refresh-Token'")
    } else {
        return [];
    }
}