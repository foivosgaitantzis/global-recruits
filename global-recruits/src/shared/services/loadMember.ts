import { Auth } from "aws-amplify";
import { UserModel } from "../state/models/User";
import { UserType } from "../state/models/UserType.enum";

export async function loadMemberDetails(): Promise<UserModel> {
    const userinfo2: UserModel = await Auth.currentAuthenticatedUser();
    userinfo2.pgUserType = UserType.athlete;   

    // Load Database Details
    return userinfo2;
}
