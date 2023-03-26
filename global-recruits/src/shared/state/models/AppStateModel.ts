import { CourseContentModel } from "./CourseContent";
import { LoadedStatus } from "./LoadedStatusEnum";
import { ProfilePictureModel } from "./ProfilePictureModel";
import { UserModel } from "./User";

export interface AppStateModel {
    memberLoadedStatus: LoadedStatus,
    user?: UserModel,
    profilePicture?: ProfilePictureModel,
    courseContent?: CourseContentModel
}