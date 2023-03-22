import { ValidationErrorsResponse } from "../models/GlobalRecruits";

/**
 * Utility Function that Generates a Dynamic Validation Error
 * @param detail The Description of the Validation Error
 * @param pointer The Schema Pointer (optional) 
 * @returns A Validation Error Response as Array
 */
export function generateValidationError(detail: string, pointer?: string): ValidationErrorsResponse {
    return [
        {
            title: 'VALIDATION_ERROR',
            detail,
            pointer: pointer ?? ""
        }
    ];
};

/**
 * Utility Function that Generates Missing Environment Variable Error Message
 * @param environmentVariable The Environment Variable Name
 * @returns An Error Message for Missing Environment Variable
 */
export function generateConfigurationErrorMessage(environmentVariable: string): string {
    return "Could not find the Environment Variable: [" + environmentVariable + "]";
}