/**
 * Helper Function to Distinguish between Null and Undefined
 * @param value The Value to Check
 * @returns True/False Depending on Whether value is Undefined
 */
export function isUndefined(value: any) {
    return typeof value === "undefined";
}