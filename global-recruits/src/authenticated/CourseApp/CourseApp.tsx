import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import LoadingPage from "../../shared/pages/LoadingPage";
import { loadCourseDetails } from "../../shared/services/loadCourse";
import { StateActionCreators } from "../../shared/state/actions/actionFunctions";
import { useStateDispatchContext, useStateContext } from "../../shared/state/AppStateProvider";
import { LoadedStatus } from "../../shared/state/models/LoadedStatusEnum";
import AppRouting from "./AppRouting";

/**
 * TODO: Hook that Loads a Course on Initial Entry
 */
const useCourseLoad = (courseCode: string | undefined) => {
    const setAppState = useStateDispatchContext();
    const courseLoadedStatus = useStateContext().courseContent?.[courseCode ?? ""]?.courseLoaded;

    useEffect(() => {
        if (courseCode && courseLoadedStatus !== LoadedStatus.LOADED) {
            loadCourseDetails(courseCode).then((courseXML: string) => {
                if (courseXML) {
                    setAppState(StateActionCreators.createChangeCourseContentAction(courseCode, courseXML));
                    setAppState(StateActionCreators.createChangeCourseLoadedStatusAction(courseCode, LoadedStatus.LOADED));
                }
            }).catch((error: any) => {
                if (axios.isAxiosError(error)) {
                    if (error.response?.status === 404) {
                        setAppState(StateActionCreators.createChangeCourseLoadedStatusAction(courseCode, LoadedStatus.NOTFOUND));
                        return;
                    }
                }
                setAppState(StateActionCreators.createChangeCourseLoadedStatusAction(courseCode, LoadedStatus.ERROR));
            });
        }
    });
}

/**
 * TODO: Course App that Loads Course on Initial Entry
 * @returns Returns the Course Content Router
 */
export default function CourseApp() {
    let { courseCode } = useParams();
    useCourseLoad(courseCode);

    const courseLoadedStatus = useStateContext().courseContent?.[courseCode ?? ""]?.courseLoaded;

    return (
        courseLoadedStatus === LoadedStatus.LOADED
        ? <AppRouting />
        : <LoadingPage />
    );
}