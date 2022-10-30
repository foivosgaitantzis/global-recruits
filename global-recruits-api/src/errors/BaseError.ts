export abstract class BaseError extends Error {
    readonly status?: string = "500";
    readonly title?: string = "Internal Server Error";
    readonly detail?: string = undefined;

    constructor(message?: string) {
        super(message);
        this.name = this.constructor.name;
        Error.captureStackTrace?.(this, this.constructor);
    }
}