import { DateTime } from "luxon";
import { ChangeEvent, useState } from "react"
import DateField from "../../../shared/fields/components/DateField";
import InputField from "../../../shared/fields/components/InputField";
import ProfileImageUploader from "../../../shared/fields/components/ProfileImageUploader";
import SelectField from "../../../shared/fields/components/SelectField";
import { ValidationType } from "../../../shared/fields/models";
import validateFieldData from "../../../shared/fields/validators";
import { CountryList } from "../../../shared/helpers/countryList";
import { ApiBaseUrl } from "../../../shared/helpers/loadEnvironmentVariables";
import { Api, GetAthleteDetailsResponse, MemberIdMeParameter } from "../../../shared/specification/GlobalRecruits";
import { StateActionCreators } from "../../../shared/state/actions/actionFunctions";
import { useStateContext, useStateDispatchContext } from "../../../shared/state/AppStateProvider";
import { ProfilePictureModel } from "../../../shared/state/models/ProfilePictureModel";
import EditButtons from "../EditButtons";
import { getViewStateFieldErrorMessage, getViewStateFieldValue, RenderViewState, setViewStateErrorMessage, setViewStateFieldErrorMessage, setViewStateFieldValue, setViewStateStatus } from "../helper";
import { ViewState, ViewStatus } from "../models";

interface PersonalDetailsProps {
    submitName: string,
    cancelName: string,
    onBackClick: () => void,
    onSubmitClick: (changed: boolean) => void
}

export default function EditPersonalDetails(props: PersonalDetailsProps) {
    const user = useStateContext().user as GetAthleteDetailsResponse;
    const userProfilePicture = useStateContext().profilePicture;
    const setAppState = useStateDispatchContext();
    const [viewState, setViewState] = useState<ViewState>({
        status: ViewStatus.Loaded,
        fields: {
            firstName: {
                value: user?.data.firstName ?? ""
            },
            lastName: {
                value: user?.data.lastName ?? ""
            },
            dateOfBirth: {
                value: DateTime.fromISO(user?.data.dateOfBirth ?? "").toISODate() ?? ""
            },
            country: {
                value: user?.data.country ?? ""
            },
            city: {
                value: user?.data.city ?? ""
            }
        }
    });
    const [profilePic, setProfilePic] = useState<ProfilePictureModel | undefined>(userProfilePicture);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setViewState(setViewStateFieldValue(viewState, event.currentTarget.getAttribute("data-statekey") as string, event.currentTarget.value))
    }

    const checkFieldsChanged = () => {
        if (user.data.firstName !== getViewStateFieldValue(viewState, "firstName")) {
            return true;
        }
        if (user.data.lastName !== getViewStateFieldValue(viewState, "lastName")) {
            return true;
        }
        if (user.data.country !== getViewStateFieldValue(viewState, "country")) {
            return true;
        }
        if (user.data.city !== getViewStateFieldValue(viewState, "city")) {
            return true;
        }
        if (DateTime.fromISO(user?.data.dateOfBirth ?? "").toISODate() !== getViewStateFieldValue(viewState, "dateOfBirth")) {
            return true;
        }
        return false;
    }

    const verifyAndSubmit = async () => {
        const textRegex = /^[a-zA-Z ]*$/;
        const firstNameErrors = validateFieldData("First Name", getViewStateFieldValue(viewState, "firstName"), true, [
            {
                type: ValidationType.MinLength,
                testCondition: 2
            },
            {
                type: ValidationType.MaxLength,
                testCondition: 50
            },
            {
                type: ValidationType.Regex,
                testCondition: textRegex,
                customErrorMessage: "First Name must only contain Text"
            }
        ]);
        const lastNameErrors = validateFieldData("Last Name", getViewStateFieldValue(viewState, "lastName"), true, [
            {
                type: ValidationType.MinLength,
                testCondition: 2
            },
            {
                type: ValidationType.MaxLength,
                testCondition: 50
            },
            {
                type: ValidationType.Regex,
                testCondition: textRegex,
                customErrorMessage: "Last Name must only contain Text"
            }
        ]);
        const countryErrors = validateFieldData("Country", getViewStateFieldValue(viewState, "country"), true, []);
        const cityErrors = validateFieldData("City", getViewStateFieldValue(viewState, "city"), true, [
            {
                type: ValidationType.MinLength,
                testCondition: 2
            },
            {
                type: ValidationType.MaxLength,
                testCondition: 50
            },
            {
                type: ValidationType.Regex,
                testCondition: textRegex,
                customErrorMessage: "City must only contain Text"
            }
        ]);
        const dateOfBirthErrors = getViewStateFieldValue(viewState, "dateOfBirth")
            ? []
            : ["Please enter a valid Date"];

        setViewState((state) => setViewStateFieldErrorMessage(state, "firstName", firstNameErrors[0]));
        setViewState((state) => setViewStateFieldErrorMessage(state, "lastName", lastNameErrors[0]));
        setViewState((state) => setViewStateFieldErrorMessage(state, "country", countryErrors[0]));
        setViewState((state) => setViewStateFieldErrorMessage(state, "city", cityErrors[0]));
        setViewState((state) => setViewStateFieldErrorMessage(state, "dateOfBirth", dateOfBirthErrors[0]));
        const totalErrors = [...firstNameErrors, ...lastNameErrors, ...countryErrors, ...cityErrors, ...dateOfBirthErrors];
        if (totalErrors.length === 0) {
            const api = new Api({
                baseURL: ApiBaseUrl
            });
            setViewState((state) => setViewStateStatus(state, ViewStatus.Saving));
            // Check if Profile Picture was Changed
            if (profilePic !== userProfilePicture) {
                if (profilePic) {
                    try {
                        await api.members.uploadMemberProfilePicture(
                            MemberIdMeParameter.TypeMe,
                            {
                                profilePicture: profilePic.file
                            },
                            {
                                headers: {
                                    "Content-Type": "multipart/form-data"
                                }
                            }
                        );
                        setAppState(StateActionCreators.createChangeProfilePictureAction(profilePic));
                    } catch (error: any) {
                        // Hit-n-Miss Process
                    }
                } else {
                    try {
                        await api.members.deleteMemberProfilePicture(
                            MemberIdMeParameter.TypeMe
                        );
                        setAppState(StateActionCreators.createChangeProfilePictureAction(undefined));
                    } catch (error: any) {
                        // Hit-n-Miss Process
                    }
                }
            }
            if (checkFieldsChanged()) {
                try {
                    await api.members.updateMemberDetails(MemberIdMeParameter.TypeMe, {
                        type: "athlete",
                        data: {
                            firstName: viewState.fields.firstName.value,
                            lastName: viewState.fields.lastName.value,
                            country: viewState.fields.country.value,
                            city: viewState.fields.city.value,
                            dateOfBirth: viewState.fields.dateOfBirth.value
                        }
                    });
                    props.onSubmitClick(true);
                } catch (error: any) {
                    setViewState((state) => setViewStateErrorMessage(state, "An Unexpected Error has Occured. Please try again Later."))
                }
            } else {
                props.onSubmitClick(false);
            }
        }
    }

    return (
        <RenderViewState state={viewState}>
            <ProfileImageUploader image={profilePic} onChange={(file) => setProfilePic(file)} />
            <div className="flex flex-col gap-x-4 lg:flex-row">
                <InputField required={true} stateKey="firstName" label="First Name" className="py-2" value={getViewStateFieldValue(viewState, "firstName")} errorMessage={getViewStateFieldErrorMessage(viewState, "firstName")} onChange={handleInputChange} />
                <InputField required={true} stateKey="lastName" label="Last Name" className="py-2" value={getViewStateFieldValue(viewState, "lastName")} errorMessage={getViewStateFieldErrorMessage(viewState, "lastName")} onChange={handleInputChange} />
            </div>
            <div className="flex flex-col gap-x-4 lg:flex-row">
                <SelectField required={true} items={CountryList} stateKey="country" label="Country" className="py-2" value={getViewStateFieldValue(viewState, "country")} errorMessage={getViewStateFieldErrorMessage(viewState, "country")} onChange={handleInputChange} />
                <InputField required={true} stateKey="city" label="City" className="py-2" value={getViewStateFieldValue(viewState, "city")} errorMessage={getViewStateFieldErrorMessage(viewState, "city")} onChange={handleInputChange} />
            </div>
            <div className="w-full lg:w-1/2 mx-auto">
                <DateField required={true} label="Date of Birth" className="py-2" value={getViewStateFieldValue(viewState, "dateOfBirth")} errorMessage={getViewStateFieldErrorMessage(viewState, "dateOfBirth")} onChange={(value: string) => setViewState(setViewStateFieldValue(viewState, "dateOfBirth", value))} />
            </div>
            <EditButtons submitName={props.submitName} cancelName={props.cancelName} onCancelClick={() => props.onBackClick()} onSubmitClick={() => verifyAndSubmit()} />
        </RenderViewState>
    )
}