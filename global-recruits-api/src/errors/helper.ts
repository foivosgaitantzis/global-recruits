import axios from "axios";
import { ErrorResponse } from "../models/GlobalRecruits";
import { BaseError } from "./BaseError";

/**
 * Utility Function that Generates an Error Response from Custom Errors
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

    return (errorResponse.title || errorResponse.detail)
        ? {
            headers: {
                'Content-Type': 'application/json'
            },
            status,
            body: errorResponse
        }
        : {
            status
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