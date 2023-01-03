import { MemberLoadedStatus } from "../models/MemberLoadedEnum";
import { UserModel } from "../models/User";
import { ChangeMemberLoadedStatusAction, ChangeUserAction } from "./actions";

function createChangeUserAction(user: UserModel): ChangeUserAction {
    return {
        type: "Change User",
        user
    }
}

function createChangeMemberLoadedStatus(memberLoadedStatus: MemberLoadedStatus): ChangeMemberLoadedStatusAction {
    return {
        type: "Change Member Loaded Status",
        memberLoadedStatus
    }
}

export const StateActionCreators = {
    createChangeUserAction,
    createChangeMemberLoadedStatus
}