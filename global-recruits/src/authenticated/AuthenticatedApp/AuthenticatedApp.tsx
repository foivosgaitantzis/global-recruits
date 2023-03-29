import { useEffect } from "react";
import LoadingPage from "../../shared/pages/LoadingPage";
import { getOnboardingPage, loadMemberDetails, loadProfilePicture } from "../../shared/services/loadMember";
import { StateActionCreators } from "../../shared/state/actions/actionFunctions";
import { useStateContext, useStateDispatchContext } from "../../shared/state/AppStateProvider";
import { LoadedStatus } from "../../shared/state/models/LoadedStatusEnum";
import OnboardingApp from "../OnboardingApp/OnboardingApp";
import AppRouting from "./AppRouting";

/**
 * Hook that Loads Member Details on First Login
 */
const useMemberLoad = () => {
    const setAppState = useStateDispatchContext();
    const memberLoadedStatus = useStateContext().memberLoadedStatus;

    useEffect(() => {
        if (memberLoadedStatus !== LoadedStatus.LOADED && memberLoadedStatus !== LoadedStatus.ERROR) {
            try {
                loadProfilePicture()
                    .then((profilePicture) => {
                        if (profilePicture) {
                            setAppState(StateActionCreators.createChangeProfilePictureAction(profilePicture));
                        }
                    })
                    .catch((error: any) => console.log(error))
                    .then(loadMemberDetails)
                    .then((memberDetails) => {
                        if (memberDetails) {
                            if (getOnboardingPage(memberDetails) !== undefined) {
                                setAppState(StateActionCreators.createChangeMemberLoadedStatusAction(LoadedStatus.ONBOARDING));
                                setAppState(StateActionCreators.createChangeUserAction(memberDetails));
                            } else {
                                setAppState(StateActionCreators.createChangeMemberLoadedStatusAction(LoadedStatus.LOADED));
                                setAppState(StateActionCreators.createChangeUserAction(memberDetails));
                            }
                        }
                    })
            } catch (error) {
                setAppState(StateActionCreators.createChangeMemberLoadedStatusAction(LoadedStatus.ERROR));
            }
        }
    }, []);
}

/**
 * Authenticated App that Either Takes you to Onboarding or Dashboard
 * @returns Loading Page, Onboarding App or Dashboard
 */
export default function AuthenticatedApp() {
    useMemberLoad();
    const memberLoadedStatus = useStateContext().memberLoadedStatus;

    const renderElements = (loadedStatus: LoadedStatus) => {
        switch (loadedStatus) {
            case LoadedStatus.LOADED:
                return <AppRouting />;
            case LoadedStatus.ONBOARDING:
                return <OnboardingApp />;
            default:
                return <LoadingPage />
        }
    }

    return renderElements(memberLoadedStatus);
}