export interface FieldState {
    value: string,
    errorMessage?: string
}

export enum ValidationType {
    MinLength,
    MaxLength,
    Min,
    Max, 
    Regex
}

export interface ValidationInput {
    type: ValidationType,
    testCondition: number | RegExp,
    customErrorMessage?: string
}

