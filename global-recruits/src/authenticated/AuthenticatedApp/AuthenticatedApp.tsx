import { useEffect } from "react";
import LoadingPage from "../../shared/pages/LoadingPage";
import { loadMemberDetails } from "../../shared/services/loadMember";
import { StateActionCreators } from "../../shared/state/actions/actionFunctions";
import { useStateContext, useStateDispatchContext } from "../../shared/state/AppStateProvider";
import { MemberLoadedStatus } from "../../shared/state/models/MemberLoadedEnum";
import AppRouting from "./AppRouting";

const useMemberLoad = () => {
    const setAppState = useStateDispatchContext();
    const memberLoadedStatus = useStateContext().memberLoadedStatus;

    useEffect(() => {
        if (memberLoadedStatus !== MemberLoadedStatus.LOADED && memberLoadedStatus !== MemberLoadedStatus.ERROR) {
            try {
                loadMemberDetails()
                    .then((memberDetails) => {
                        if (memberDetails) {
                            setAppState(StateActionCreators.createChangeMemberLoadedStatus(MemberLoadedStatus.LOADED));
                            setAppState(StateActionCreators.createChangeUserAction(memberDetails));
                        }
                    })
            } catch (error) {
                setAppState(StateActionCreators.createChangeMemberLoadedStatus(MemberLoadedStatus.ERROR));
            }
        }
    });
}

export default function AuthenticatedApp() {
    useMemberLoad();

    const memberLoadedStatus = useStateContext().memberLoadedStatus;
    return (
        memberLoadedStatus === MemberLoadedStatus.LOADED
            ? <AppRouting />
            : <LoadingPage />
    );
}