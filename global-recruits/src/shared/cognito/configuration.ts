/**
 * AWS Cognito Identity Configuration
 */
export const CognitoConfiguration = {
    Auth: {
        region: "us-east-1",
        userPoolId: process.env.REACT_APP_COGNITO_USER_POOL_ID,
        userPoolWebClientId: process.env.REACT_APP_COGNITO_WEB_CLIENT_ID
    }
}