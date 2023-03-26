import { useEffect, useState } from "react";
import Button from "../../shared/components/Button";
import ProgressBar from "../../shared/components/ProgressBar";
import SectionTitle from "../../shared/components/SectionTitle";
import LoadingPage from "../../shared/pages/LoadingPage";
import { getOnboardingPage, loadMemberDetails } from "../../shared/services/loadMember";
import { MemberType } from "../../shared/specification/GlobalRecruits";
import { StateActionCreators } from "../../shared/state/actions/actionFunctions";
import { useStateContext, useStateDispatchContext } from "../../shared/state/AppStateProvider";
import { LoadedStatus } from "../../shared/state/models/LoadedStatusEnum";
import { UserModel } from "../../shared/state/models/User";
import EditAthleteDetails from "../views/athlete/EditAthleteDetails";
import EditPersonalDetails from "../views/athlete/EditPersonalDetails";
import ViewAthleteTeams from "../views/athlete/ViewAthleteTeams";

/**
 * Metadata for the Onboarding Steps of Each Individual Role
 */
const ONBOARDING_STEPS = {
    [MemberType.Athlete]: [
        {
            name: "Personal Information",
            description: "Name, Date of Birth, Country & City"
        },
        {
            name: "Athlete Information",
            description: "Height, Weight & Biography"
        },
        {
            name: "Teams",
            description: "Teams & Team History"
        },
        {
            name: "Academics",
            description: "Education History"
        }
    ],
    [MemberType.Staff]: [
        {
            name: "Coach Information",
            description: "Name"
        },

    ],
    [MemberType.Administrator]: []
}

/**
 * Onboarding App that Handles Onboarding Stepper for Each Role
 * @returns The Appropriate Screen View According to State
 */
export default function OnboardingApp() {
    const setAppState = useStateDispatchContext();
    const user = useStateContext().user;
    const [onboardingPage, setOnboardingPage] = useState<number | undefined>(0);

    useEffect(() => {
        setOnboardingPage(getOnboardingPage(user as UserModel));
    }, []);

    const onSubmitClick = (changed: boolean) => {
        if (onboardingPage) {
            if (changed) {
                try {
                    loadMemberDetails()
                        .then((memberDetails) => {
                            if (memberDetails) {
                                setAppState(StateActionCreators.createChangeUserAction(memberDetails));
                                setOnboardingPage(onboardingPage + 1);
                            } else {
                                setAppState(StateActionCreators.createChangeMemberLoadedStatusAction(LoadedStatus.ERROR));
                            }
                        })
                } catch (error) {
                    setAppState(StateActionCreators.createChangeMemberLoadedStatusAction(LoadedStatus.ERROR));
                }
            } else {
                setOnboardingPage(onboardingPage + 1);
            }
        }
    }

    const renderOnboardingPage = () => {
        if (onboardingPage === 0) {
            return <>
                <div className="flex flex-col justify-center mb-4 px-4">
                    <p className="mt-2 text-lg">Welcome to GlobalRecruits! We are going to need a couple of more details from your before you can begin using our platform!</p>
                    <p className="mt-2 text-lg font-bold">What we will require:</p>
                    <ul className="mt-2 text-lg mx-auto list-disc text-left">
                        {Object.entries(ONBOARDING_STEPS[user?.type as MemberType]).map(([key, value]) => {
                            return <li key={key}>
                                <span className="font-bold">{value.name}</span> - {value.description}
                            </li>
                        })}

                    </ul>
                </div>
                <Button fontSizeClass="lg" className="mx-2" text={
                    onboardingPage === 0 ? "Start Now" : "Next Page"} onClick={() => setOnboardingPage(onboardingPage + 1)} />
            </>
        }
        if (user?.type === MemberType.Athlete) {
            switch (onboardingPage) {
                case 1:
                    return <EditPersonalDetails
                        key={onboardingPage}
                        submitName="Next →"
                        cancelName="← Back"
                        onBackClick={() => setOnboardingPage(onboardingPage - 1)}
                        onSubmitClick={onSubmitClick}
                    />
                case 2:
                    return <EditAthleteDetails
                        key={onboardingPage}
                        submitName="Next →"
                        cancelName="← Back"
                        onBackClick={() => setOnboardingPage(onboardingPage - 1)}
                        onSubmitClick={onSubmitClick}
                    />
                case 3:
                    return <ViewAthleteTeams
                        key={onboardingPage}
                        submitName="Next →"
                        cancelName="← Back"
                        onBackClick={() => setOnboardingPage(onboardingPage - 1)}
                        onSubmitClick={() => onSubmitClick(false)}
                    />
            }
        } else if (user?.type === MemberType.Staff) {

        }
    }

    return (
        typeof onboardingPage !== 'undefined'
            ? <div className="gradient-theme font-custom text-[#4e2217] px-4 sm:px-0 h-full min-h-screen flex justify-center flex-wrap m-auto">
                <div className="my-4 w-full landscape:w-2/3 md:landscape:w-1/3 bg-white p-8 text-center">
                    <img src="/logo.png" className="my-2 w-1/4 mx-auto" />
                    <SectionTitle>{onboardingPage === 0 ? "Complete your Profile" : ONBOARDING_STEPS[user?.type as MemberType][onboardingPage - 1].name} </SectionTitle>
                    <ProgressBar steps={ONBOARDING_STEPS[user?.type as MemberType]} currentStep={onboardingPage} />
                    {renderOnboardingPage()}
                </div>
            </div>
            : <LoadingPage />
    );
}