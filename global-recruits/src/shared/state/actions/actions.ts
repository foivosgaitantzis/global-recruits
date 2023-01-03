import { MemberLoadedStatus } from "../models/MemberLoadedEnum";
import { UserModel } from "../models/User";

export interface BaseAction {
    type: StateActionTypes
}

export type StateActionTypes =
    | "Change User"
    | "Change Member Loaded Status"

export interface ChangeUserAction extends BaseAction {
    user?: UserModel
}

export interface ChangeMemberLoadedStatusAction extends BaseAction {
    memberLoadedStatus: MemberLoadedStatus
}

export type StateActions = 
    | ChangeUserAction
    | ChangeMemberLoadedStatusAction;