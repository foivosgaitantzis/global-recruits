import { MemberLoadedStatus } from "./MemberLoadedEnum";
import { UserModel } from "./User";

export interface AppStateModel {
    memberLoadedStatus: MemberLoadedStatus,
    user?: UserModel
}