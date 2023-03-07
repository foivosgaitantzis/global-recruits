import { CognitoIdentityProviderClient, AdminCreateUserCommand, UsernameExistsException } from "@aws-sdk/client-cognito-identity-provider";
import { MemberAlreadyExistsError, CognitoError } from "../errors/CustomErrors";
import { AwsAccessKeyId, AwsAccessKeySecret, CognitoUserpoolId } from "../helpers/loadEnvironmentVariables";

const region = CognitoUserpoolId.split("_")[0];
const CognitoClient = new CognitoIdentityProviderClient({
    credentials: {
        accessKeyId: AwsAccessKeyId,
        secretAccessKey: AwsAccessKeySecret
    },
    region,
    defaultsMode: "standard"
});

/**
 * Creates a Cognito User (Admin User Create)
 * @param emailAddress The Email Address
 * @returns The Newly Created User's Sub
 */
export async function createCognitoUser(emailAddress: string): Promise<string | undefined> {
    try {
        const command = new AdminCreateUserCommand({
            Username: emailAddress,
            UserPoolId: CognitoUserpoolId,
            UserAttributes: [
                {
                    Name: "email",
                    Value: emailAddress
                },
                {
                    Name: "email_verified",
                    Value: "True"
                }
            ]
        });
        const response = await CognitoClient.send(command);
        return response.User.Attributes.find((attribute) => attribute.Name === "sub").Value;
    } catch (error: any) {
        if (error instanceof UsernameExistsException) {
            throw new MemberAlreadyExistsError(error.message);
        }
        throw new CognitoError(error.message);
    }
}