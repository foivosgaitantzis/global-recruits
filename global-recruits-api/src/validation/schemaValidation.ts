import { GlobalRecruits } from "./GlobalRecruits";
import Ajv, { ErrorObject } from "ajv"
import addFormats from "ajv-formats";
import { ValidationErrorsResponse } from "../models/GlobalRecruits";

/**
 * Utility Function to Get the Open API Specification Path
 * @param route The Route ex. "/mailinglist"
 * @param method The Method ex. "post"
 * @returns The Full Schema for the Given Path
 */
export function getOpenApiPath(route: string, method: string) {
    return GlobalRecruits?.[route]?.[method.toLowerCase()];
}

/**
 * Utility Function to Get the Request Body Schema of a Route
 * @param openApiPath The Open API Path from 'getOpenApiPath'
 * @param contentType Optional Content Type (If not 'application/json')
 * @returns The Request Body Validation Schema
 */
export function getRequestBodySchema(openApiPath: any, contentType?: string) {
    return openApiPath?.requestBody?.content?.[contentType ?? "application/json"]?.schema;
}

/**
 * Utility Function to get the Parameter Schema of a Route
 * @param openApiPath The Open API Path from 'getOpenApiPath'
 * @param parameterLocation The Parameter Location ex. 'query', 'path', etc.
 * @returns The Parameter Validation Schema Object
 */
export function getParameterSchemas(openApiPath: any, parameterLocation: "query" | "header" | "path" | "cookie") {
    const parameters = openApiPath?.parameters?.filter((parameter: any) => parameter.in === parameterLocation);
    if (parameters && parameters.length > 0) {
        const parameterSchema = {
            type: "object",
            required: [],
            properties: {}
        }

        parameters.forEach((parameter: any) => {
            parameterSchema.properties[parameter.name] = parameter.schema;
            if (parameter.required) {
                parameterSchema.required.push(parameter.name);
            }
        });
        return parameterSchema;
    }
}

/**
 * Utility Function that Converts Query Parameters to Appropriate Type
 * @param queryParameters The Dynamic Query Parameters Object ex. req.query
 * @param queryParametersSchema The Query Parameter Schema 'getParameterSchemas'
 * @returns The Converted Type Query Parameters
 */
export function convertQueryParameters(queryParameters: any, queryParametersSchema: any) {
    const queryParametersConverted = queryParameters;
    for (const key of Object.keys(queryParameters)) {
        if (!Number.isNaN(Number(queryParameters[key])) && hasNumberType(key, queryParametersSchema)) {
            queryParametersConverted[key] = Number(queryParameters[key]);
        } else if (queryParameters[key] && hasArrayType(key, queryParametersSchema)) {
            queryParametersConverted[key] = queryParameters[key].split(",");
        } else if (!Number.isNaN(Date.parse(queryParameters[key])) && hasDateFormat(key, queryParametersSchema)) {
            queryParametersConverted[key] = new Date(queryParameters[key]).toISOString().split("T")[0];
        }
    }
    return queryParametersConverted;
}

/**
 * Utility Function that Checks if the Parameter should be of Number Type (From Schema)
 * @param key The Parameter Key ex. 'X-Auth-Key', 'page', etc.
 * @param schema The Parameter Schema from 'getParameterSchemas'
 * @returns Whether the parameter should be a number type
 */
function hasNumberType(key: string, schema: any) {
    if (schema.properties?.[key] && Object.keys(schema.properties?.[key]).includes("type")) {
        const type = schema.properties?.[key].type;
        return type === "number" || type === "integer"
    } else {
        return false;
    }
}

/**
 * Utility Function that Checks if the Parameter should be of Array Type (From Schema)
 * @param key The Parameter Key ex. 'X-Auth-Key', 'page', etc.
 * @param schema The Parameter Schema from 'getParameterSchemas'
 * @returns Whether the parameter should be an Array type
 */
function hasArrayType(key: string, schema: any) {
    if (schema.properties?.[key] && Object.keys(schema.properties?.[key]).includes("type")) {
        const type = schema.properties?.[key].type;
        return type === "array"
    } else {
        return false;
    }
}

/**
 * Utility Function that Checks if the Parameter should be of Date Type (From Schema)
 * @param key The Parameter Key ex. 'X-Auth-Key', 'page', etc.
 * @param schema The Parameter Schema from 'getParameterSchemas'
 * @returns Whether the parameter should be a Date type
 */
function hasDateFormat(key: string, schema: any) {
    if (schema.properties?.[key] && Object.keys(schema.properties?.[key]).includes("type")) {
        const type = schema.properties?.[key].type;
        const format = schema.properties?.[key].format;
        return type === "string" && (format === "date" || format === "date-time")
    } else {
        return false;
    }
}

type ValidatorErrors = ErrorObject<string, Record<string, any>, unknown>[] | null | undefined;

/**
 * Creates a New AJV Schema Validation Instance
 */
const ajvInstance = new Ajv({
    allErrors: true,
    discriminator: true,
    strict: false,
    unicodeRegExp: false,
    removeAdditional: 'all'
});

/**
 * Adds Useful Formats to the AJV Instance
 */
addFormats(ajvInstance, ["email", "date-time", "date", "int32", "int64", "double", "float", "uuid", "binary"]);

/**
 * Validates a Schema Tuple and Returns an Array of ValidationErrors
 * @param validationTuples Validator Tuples ex. [querySchema, queryParameters], [requestBodySchema, req.body]
 * @returns An Array of Validation Errors to be Returned 
 */
export function validateSchemaTuples(...validationTuples: any[]): ValidationErrorsResponse {
    const ajvValidationErrors: ValidatorErrors = [];
    const validationErrors: ValidationErrorsResponse = []

    validationTuples.forEach((validationTuple: any) => {
        const compiledSchema = ajvInstance.compile(validationTuple[1]);
        compiledSchema(validationTuple[0] ?? {});
        if (compiledSchema?.errors) {
            ajvValidationErrors.push(...compiledSchema.errors);
        }
    });

    if (ajvValidationErrors && ajvValidationErrors.length > 0) {
        ajvValidationErrors.forEach(ajvValidationError => {
            validationErrors.push(
                {
                    title: "VALIDATION_ERROR",
                    detail: ajvValidationError.message ?? "",
                    pointer: ajvValidationError.instancePath
                }
            )
        });
    }

    return validationErrors;
}