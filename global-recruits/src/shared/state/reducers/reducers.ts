import { ChangeMemberLoadedStatusAction, ChangeUserAction, StateActions } from "../actions/actions";
import { AppStateModel } from "../models/AppStateModel";

export function AppStateReducer(state: AppStateModel, action: StateActions): AppStateModel {
    switch (action.type) {
        case "Change User": {
            const changeUserAction = action as ChangeUserAction;
            return {
                ...state,
                user: changeUserAction.user
            }
        }
        case "Change Member Loaded Status": {
            const changeMemberLoadedStatusAction = action as ChangeMemberLoadedStatusAction
            return {
                ...state,
                memberLoadedStatus: changeMemberLoadedStatusAction.memberLoadedStatus
            }
        }
        default: {
            return state;
        }
    }
}