import axios from "axios";
import { ErrorResponse } from "../models/GlobalRecruits";
import { BaseError } from "./BaseError";
import { ValidationErrorsResponse } from "../models/GlobalRecruits";

/**
 * Utility Function that Generates a Function Error Response from Custom Errors
 * @param error The Error
 */
export function generateErrorResponse(error: Error) {
    let errorResponse: ErrorResponse = {
        title: "Internal Server Error",
        detail: undefined
    }
    let status = "500";

    if (error instanceof BaseError) {
        errorResponse = {
            title: error.title,
            detail: error.detail
        }
        status = error.status;
    }

    return {
        headers: {
            'Content-Type': 'application/json'
        },
        status,
        body: errorResponse
    }
}

/**
 * Utility Function that Generates a Validation Error Function Response 
 * @param validationErrors The Validation Errors 
 * @returns The Response of the Function
 */
export function generateValidationErrorResponse(validationErrors: ValidationErrorsResponse) {
    return {
        headers: {
            'Content-Type': 'application/json'
        },
        status: 400,
        body: validationErrors
    }
}

export function generateErrorMessage(error: Error, customErrorMessage?: string) {
    let errorMessage = error.message;
    if (customErrorMessage) {

    } else {
        if (axios.isAxiosError(errorMessage)) {

        }
    }
}