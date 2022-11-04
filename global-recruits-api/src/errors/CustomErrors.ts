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

/**
 * Not Found Error Thrown when a Resource is NOT Found
 */
 export class NotFoundError extends BaseError {
    constructor(message: string) {
        super(message);
        this.name = this.constructor.name;
    }

    readonly title = undefined;
    readonly status = "404";
}


/**
 * Stripe Error Thrown when an Unexpected Stripe Error Occurs
 */
export class StripeError extends BaseError {
    constructor(message: string) {
        super(message);
        this.name = this.constructor.name;
    }

    readonly detail = "Underlying Service Issues (Stripe)";
}

/**
 * Discord Error Thrown when an Unexpected Discord Error Occurs
 */
 export class DiscordError extends BaseError {
    constructor(message: string) {
        super(message);
        this.name = this.constructor.name;
    }

    readonly detail = "Underlying Service Issues (Discord)";
}

/**
 * Error thrown when a Member Already Exists (Registration Endpoint)
 */
 export class MemberAlreadyExistsError extends BaseError {
    constructor(message: string) {
        super(message);
        this.name = this.constructor.name;
    }

    readonly title = "Member Already Exists";
    readonly status = "409";
}