import { ValidationInput, ValidationType } from "./models";

export default function validateFieldData(fieldName: string, value: string | number, required: boolean, validationInputs: ValidationInput[]): string[] {
    const errorMessages: string[] = [];

    // Check for Required Nature
    if (required && !value) {
        errorMessages.push(fieldName + " is Required");
    }

    for (const validationInput of validationInputs) {
        switch (validationInput.type) {
            case ValidationType.MinLength:
                const minLengthValue = validationInput.testCondition as number;
                if ((value as string).length < minLengthValue) {
                    errorMessages.push(validationInput.customErrorMessage
                        ?? fieldName + " must contain at least " + validationInput.testCondition + " characters")
                }
                break;
            case ValidationType.MaxLength:
                const maxLengthValue = validationInput.testCondition as number;
                if ((value as string).length > maxLengthValue) {
                    errorMessages.push(validationInput.customErrorMessage
                        ?? fieldName + " must contain at most " + validationInput.testCondition + " characters")
                }
                break;
            case ValidationType.Min:
                const minValue = validationInput.testCondition as number;
                if ((value as Number) < minValue) {
                    errorMessages.push(validationInput.customErrorMessage
                        ?? fieldName + " must be greater than '" + validationInput.testCondition + "'")
                }
                break;
            case ValidationType.Max:
                const maxValue = validationInput.testCondition as number;
                if ((value as Number) > maxValue) {
                    errorMessages.push(validationInput.customErrorMessage
                        ?? fieldName + " must be less than '" + validationInput.testCondition + "'")
                }
                break;
            case ValidationType.Regex:
                const regex = validationInput.testCondition as RegExp;
                if (!regex.test(value as string)) {
                    errorMessages.push(validationInput.customErrorMessage
                        ?? fieldName + " must match the following pattern: '" + validationInput.testCondition + "'")
                }
                break;
        }
    }
    return errorMessages;
}