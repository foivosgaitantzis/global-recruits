import { CourseContentModel } from "./CourseContent";
import { LoadedStatus } from "./LoadedStatusEnum";
import { UserModel } from "./User";

export interface AppStateModel {
    memberLoadedStatus: LoadedStatus,
    user?: UserModel,
    profilePicture?: File,
    courseContent?: CourseContentModel
}