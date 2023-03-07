/**
 * Load ALL Environment Variables
 */

// Define Environment Variable Keys
const MailchimpApiKeyKey = "MAILCHIMP_APIKEY";
const MailchimpServerKey = "MAILCHIMP_SERVER";
const MailchimpAudienceIdKey = "MAILCHIMP_AUDIENCEID";

const AwsAccessKeyIdKey = "AWS_ACCESSKEY_ID";
const AwsAccessKeySecretKey = "AWS_ACCESSKEY_SECRET";
const CognitoUserpoolIdKey = "COGNITO_USERPOOL_ID";
const CognitoIssuerHostKey = "COGNITO_ISSUER_HOST";

const PostgresHostKey = "POSTGRES_HOST";
const PostgresUserKey = "POSTGRES_USER";
const PostgresPasswordKey = "POSTGRES_PASSWORD";
const PostgresDatabaseKey = "POSTGRES_DATABASE";

// Load Environment Variables
export const MailchimpApiKey = process.env[MailchimpApiKeyKey] ?? "";
export const MailchimpServer = process.env[MailchimpServerKey] ?? "";
export const MailchimpAudienceId = process.env[MailchimpAudienceIdKey] ?? "";

export const AwsAccessKeyId = process.env[AwsAccessKeyIdKey] ?? "";
export const AwsAccessKeySecret = process.env[AwsAccessKeySecretKey] ?? "";
export const CognitoUserpoolId = process.env[CognitoUserpoolIdKey] ?? "";
export const CognitoIssuerHost = process.env[CognitoIssuerHostKey] ?? "";

export const PostgresHost = process.env[PostgresHostKey] ?? "";
export const PostgresUser = process.env[PostgresUserKey] ?? "";
export const PostgresPassword = process.env[PostgresPasswordKey] ?? "";
export const PostgresDatabase = process.env[PostgresDatabaseKey] ?? "";

// Validate Environment Variable Presence
export const MissingEnvironmentVariables: string[] = [];

if (!MailchimpApiKey) MissingEnvironmentVariables.push(MailchimpApiKeyKey);
if (!MailchimpServer) MissingEnvironmentVariables.push(MailchimpServerKey);
if (!MailchimpAudienceId) MissingEnvironmentVariables.push(MailchimpAudienceIdKey);
if (!AwsAccessKeyId) MissingEnvironmentVariables.push(AwsAccessKeyIdKey);
if (!AwsAccessKeySecret) MissingEnvironmentVariables.push(AwsAccessKeySecretKey);
if (!CognitoUserpoolId) MissingEnvironmentVariables.push(CognitoUserpoolIdKey);
if (!PostgresHost) MissingEnvironmentVariables.push(PostgresHostKey);
if (!PostgresUser) MissingEnvironmentVariables.push(PostgresUserKey);
if (!PostgresPassword) MissingEnvironmentVariables.push(PostgresPasswordKey);
if (!PostgresDatabase) MissingEnvironmentVariables.push(PostgresDatabaseKey);
if (!CognitoIssuerHost) MissingEnvironmentVariables.push(CognitoIssuerHostKey)