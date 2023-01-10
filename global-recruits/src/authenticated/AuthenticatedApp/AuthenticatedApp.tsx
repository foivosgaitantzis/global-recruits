import { useEffect } from "react";
import LoadingPage from "../../shared/pages/LoadingPage";
import { loadMemberDetails } from "../../shared/services/loadMember";
import { StateActionCreators } from "../../shared/state/actions/actionFunctions";
import { useStateContext, useStateDispatchContext } from "../../shared/state/AppStateProvider";
import { LoadedStatus } from "../../shared/state/models/LoadedStatusEnum";
import AppRouting from "./AppRouting";

const useMemberLoad = () => {
    const setAppState = useStateDispatchContext();
    const memberLoadedStatus = useStateContext().memberLoadedStatus;

    useEffect(() => {
        if (memberLoadedStatus !== LoadedStatus.LOADED && memberLoadedStatus !== LoadedStatus.ERROR) {
            try {
                loadMemberDetails()
                    .then((memberDetails) => {
                        if (memberDetails) {
                            setAppState(StateActionCreators.createChangeMemberLoadedStatusAction(LoadedStatus.LOADED));
                            setAppState(StateActionCreators.createChangeUserAction(memberDetails));
                        }
                    })
            } catch (error) {
                setAppState(StateActionCreators.createChangeMemberLoadedStatusAction(LoadedStatus.ERROR));
            }
        }
    });
}

export default function AuthenticatedApp() {
    useMemberLoad();

    const memberLoadedStatus = useStateContext().memberLoadedStatus;
    return (
        memberLoadedStatus === LoadedStatus.LOADED
            ? <AppRouting />
            : <LoadingPage />
    );
}