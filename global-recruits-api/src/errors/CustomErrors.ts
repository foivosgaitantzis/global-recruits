import { BaseError } from "./BaseError";

/**
 * Unauthorized Error Thrown when User Credentials are Incorrect
 */
export class UnauthorizedError extends BaseError {
    constructor(message: string) {
        super(message);
        this.name = this.constructor.name;
    }

    readonly title = undefined;
    readonly status = "401";
}

/**
 * Forbidden Error Thrown when User is NOT in Server/Appropriate Role
 */
export class ForbiddenError extends BaseError {
    constructor(message: string) {
        super(message);
        this.name = this.constructor.name;
    }

    readonly title = undefined;
    readonly status = "403";
}