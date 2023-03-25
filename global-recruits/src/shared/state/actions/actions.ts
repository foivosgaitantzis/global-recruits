import { LoadedStatus } from "../models/LoadedStatusEnum";
import { UserModel } from "../models/User";

export interface BaseAction {
    type: StateActionTypes
}

export type StateActionTypes =
    | "Change User"
    | "Change User Profile Picture"
    | "Change Member Loaded Status"
    | "Change Course Loaded Status"
    | "Change Course Content"

export interface ChangeUserAction extends BaseAction {
    user?: UserModel
}

export interface ChangeProfilePictureAction extends BaseAction {
    profilePicture?: File
}

export interface ChangeMemberLoadedStatusAction extends BaseAction {
    memberLoadedStatus: LoadedStatus
}

export interface ChangeCourseLoadedStatusAction extends BaseAction {
    course: string,
    courseLoadedStatus: LoadedStatus
}

export interface ChangeCourseContentAction extends BaseAction {
    course: string,
    XMLContent?: string
}

export type StateActions = 
    | ChangeUserAction
    | ChangeProfilePictureAction
    | ChangeMemberLoadedStatusAction
    | ChangeCourseLoadedStatusAction
    | ChangeCourseContentAction;