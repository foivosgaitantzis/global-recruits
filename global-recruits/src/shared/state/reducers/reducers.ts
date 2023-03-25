import { ChangeCourseContentAction, ChangeCourseLoadedStatusAction, ChangeMemberLoadedStatusAction, ChangeProfilePictureAction, ChangeUserAction, StateActions } from "../actions/actions";
import { AppStateModel } from "../models/AppStateModel";
import { LoadedStatus } from "../models/LoadedStatusEnum";

export function AppStateReducer(state: AppStateModel, action: StateActions): AppStateModel {
    switch (action.type) {
        case "Change User": {
            const changeUserAction = action as ChangeUserAction;
            return {
                ...state,
                user: changeUserAction.user
            }
        }
        case "Change User Profile Picture": {
            const changeProfilePictureAction = action as ChangeProfilePictureAction;
            return {
                ...state,
                profilePicture: changeProfilePictureAction.profilePicture
            }
        }
        case "Change Member Loaded Status": {
            const changeMemberLoadedStatusAction = action as ChangeMemberLoadedStatusAction
            return {
                ...state,
                memberLoadedStatus: changeMemberLoadedStatusAction.memberLoadedStatus
            }
        }
        case "Change Course Loaded Status": {
            const changeCourseLoadedStatusAction = action as ChangeCourseLoadedStatusAction;
            return {
                ...state,
                courseContent: {
                    ...state.courseContent,
                    [changeCourseLoadedStatusAction.course]: {
                        ...state.courseContent?.[changeCourseLoadedStatusAction.course],
                        courseLoaded: changeCourseLoadedStatusAction.courseLoadedStatus
                    }
                }
            }
        }
        case "Change Course Content": {
            const changeCourseLoadedStatusAction = action as ChangeCourseContentAction;
            return {
                ...state,
                courseContent: {
                    ...state.courseContent,
                    [changeCourseLoadedStatusAction.course]: {
                        ...state.courseContent?.[changeCourseLoadedStatusAction.course],
                        XMLContent: changeCourseLoadedStatusAction.XMLContent,
                        courseLoaded: state.courseContent?.[changeCourseLoadedStatusAction.course]?.courseLoaded ?? LoadedStatus.LOADED
                    }
                }
            }
        }
        default: {
            return state;
        }
    }
}