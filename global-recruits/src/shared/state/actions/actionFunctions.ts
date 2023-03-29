import { LoadedStatus } from "../models/LoadedStatusEnum";
import { ProfilePictureModel } from "../models/ProfilePictureModel";
import { UserModel } from "../models/User";
import { ChangeCourseContentAction, ChangeCourseLoadedStatusAction, ChangeMemberLoadedStatusAction, ChangeProfilePictureAction, ChangeUserAction } from "./actions";

function createChangeUserAction(user: UserModel): ChangeUserAction {
    return {
        type: "Change User",
        user
    }
}

function createChangeProfilePictureAction(profilePicture?: ProfilePictureModel): ChangeProfilePictureAction {
    return {
        type: "Change User Profile Picture",
        profilePicture
    }
}

function createChangeMemberLoadedStatusAction(memberLoadedStatus: LoadedStatus): ChangeMemberLoadedStatusAction {
    return {
        type: "Change Member Loaded Status",
        memberLoadedStatus
    }
}

function createChangeCourseLoadedStatusAction(course: string, courseLoadedStatus: LoadedStatus): ChangeCourseLoadedStatusAction {
    return {
        type: "Change Course Loaded Status",
        course,
        courseLoadedStatus
    }
}

function createChangeCourseContentAction(course: string, XMLContent: string): ChangeCourseContentAction {
    return {
        type: "Change Course Content",
        course,
        XMLContent
    }
}

export const StateActionCreators = {
    createChangeUserAction,
    createChangeProfilePictureAction,
    createChangeMemberLoadedStatusAction,
    createChangeCourseLoadedStatusAction,
    createChangeCourseContentAction
}