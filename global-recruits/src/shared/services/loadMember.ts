import { Auth } from "aws-amplify";
import { UserModel } from "../state/models/User";

export async function loadMemberDetails(): Promise<UserModel> {
    const userInfo = await Auth.currentUserInfo();
    const userinfo2 = await Auth.currentAuthenticatedUser();
    console.log(userinfo2);

    return userinfo2 as UserModel;

}