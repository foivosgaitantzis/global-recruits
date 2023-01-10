import { LoadedStatus } from "./LoadedStatusEnum"

export interface CourseContentModel {
    [index: string]: {
        XMLContent?: string,
        courseLoaded: LoadedStatus
    }
}