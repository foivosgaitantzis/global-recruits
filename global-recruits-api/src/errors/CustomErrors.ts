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
    detail: string;
    constructor(message: string) {
        super(message);
        this.name = this.constructor.name;
        this.detail = message;
    }

    readonly title = "Resource Not Found";
    readonly status = "404";
}

/**
 * Cognito Error Thrown when an Unexpected Cognito Error Occurs
 */
export class CognitoError extends BaseError {
    constructor(message: string) {
        super(message);
        this.name = this.constructor.name;
    }

    readonly detail = "Underlying User Service Issues";
}

/**
 * Postgres Error Thrown when an Unexpected Postgres Error Occurs
 */
export class PostgresError extends BaseError {
    constructor(message: string) {
        super(message);
        this.name = this.constructor.name;
    }

    readonly detail = "Underlying Database Issues";
}

/**
 * Error thrown when a Member Already Exists (Registration Endpoint)
 */
export class MemberAlreadyExistsError extends BaseError {
    constructor(message: string) {
        super(message);
        this.name = this.constructor.name;
    }

    readonly title = "Conflict"
    readonly status = "409";
    readonly detail = "Member Already Exists";
}

/**
 * Error thrown when a Bearer Token has NOT Been Provided
 */
export class MissingTokenError extends BaseError {
    constructor(message: string) {
        super(message);
        this.name = this.constructor.name;
    }

    readonly title = "Unauthorized";
    readonly status = "401";
    readonly detail = "Authorization Token was NOT Provided";
}


/**
 * Error thrown when an Invalid Token has Been Provided
 */
export class InvalidTokenError extends BaseError {
    constructor(message: string) {
        super(message);
        this.name = this.constructor.name;
    }

    readonly title = "Unauthorized";
    readonly status = "401";
    readonly detail = "Invalid Authorization Token was Provided";
}

/**
 * Error thrown when an Expired Token has Been Provided
 */
export class ExpiredTokenError extends BaseError {
    constructor(message: string) {
        super(message);
        this.name = this.constructor.name;
    }

    readonly title = "Unauthorized";
    readonly status = "401";
    readonly detail = "The Authorization token Provided has Expired";
}

/**
 * Error thrown when there is a Validation Issue (Excludes Schema Validation)
 */
export class ValidationError extends BaseError {
    detail: string;
    constructor(message: string) {
        super(message);
        this.name = this.constructor.name;
        this.detail = message;
    }
    readonly title = "Validation Error";
    readonly status = "400";
}