import { ChangeEvent, useState } from "react";
import ProfileImageUploader from "../../../shared/fields/components/ProfileImageUploader";
import { ApiBaseUrl } from "../../../shared/helpers/loadEnvironmentVariables";
import { Api, GetAthleteDetailsResponse, HeightUnit, MemberIdMeParameter, WeightUnit } from "../../../shared/specification/GlobalRecruits";
import { useStateContext, useStateDispatchContext } from "../../../shared/state/AppStateProvider";
import EditButtons from "../EditButtons";
import { ViewState, ViewStatus } from "../models";
import { getViewStateFieldErrorMessage, getViewStateFieldValue, RenderViewState, setViewStateErrorMessage, setViewStateFieldErrorMessage, setViewStateFieldValue, setViewStateStatus } from "../helper";
import InputField from "../../../shared/fields/components/InputField";
import SelectField from "../../../shared/fields/components/SelectField";
import { AiFillCloseCircle } from "react-icons/ai";
import validateFieldData from "../../../shared/fields/validators";
import { ValidationType } from "../../../shared/fields/models";
import { StateActionCreators } from "../../../shared/state/actions/actionFunctions";

interface AthleteDetailsProps {
    submitName: string,
    cancelName: string,
    onBackClick: () => void,
    onSubmitClick: (changed: boolean) => void
}

export default function EditAthleteDetails(props: AthleteDetailsProps) {
    const userProfilePicture = useStateContext().profilePicture;
    const user = useStateContext().user as GetAthleteDetailsResponse;
    const setAppState = useStateDispatchContext();
    const getHeightInitialValues = () => {
        switch (user.data.height?.unit) {
            case HeightUnit.Feet:
                const values = (user.data.height?.value.toString() ?? "").split(".");
                const feetValue = (values.length == 2) && values[0];
                const inchesValue = (values.length == 2) && values[1];
                return {
                    heightUnit: HeightUnit.Feet,
                    heightMetersValue: "",
                    heightFeetValue: feetValue || "",
                    heightInchesValue: inchesValue || ""
                }
            case HeightUnit.Meters:
                return {
                    heightUnit: HeightUnit.Meters,
                    heightMetersValue: user.data.height?.value?.toString() ?? "",
                    heightFeetValue: "",
                    heightInchesValue: ""
                }
            default:
                return {
                    heightUnit: HeightUnit.Feet,
                    heightMetersValue: "",
                    heightFeetValue: "",
                    heightInchesValue: ""
                }
        }
    }
    const getWeightInitialValues = () => {
        switch (user.data.weight?.unit) {
            case WeightUnit.Pounds:
                return {
                    weightUnit: WeightUnit.Pounds,
                    weightPoundsValue: user.data.weight?.value?.toString() ?? "",
                    weightKgValue: "",
                }
            case WeightUnit.Kg:
                return {
                    weightUnit: WeightUnit.Kg,
                    weightPoundsValue: "",
                    weightKgValue: user.data.weight?.value?.toString() ?? "",
                }
            default:
                return {
                    weightUnit: WeightUnit.Pounds,
                    weightPoundsValue: "",
                    weightKgValue: "",
                }
        }
    }
    const userHeight = getHeightInitialValues();
    const userWeight = getWeightInitialValues();
    const [profilePic, setProfilePic] = useState<File | undefined>(userProfilePicture);
    const [viewState, setViewState] = useState<ViewState>({
        status: ViewStatus.Loaded,
        fields: {
            heightFeetValue: {
                value: userHeight.heightFeetValue
            },
            heightInchesValue: {
                value: userHeight.heightInchesValue
            },
            heightMetersValue: {
                value: userHeight.heightMetersValue
            },
            heightUnit: {
                value: userHeight.heightUnit
            },
            weightPoundsValue: {
                value: userWeight.weightPoundsValue
            },
            weightKgValue: {
                value: userWeight.weightKgValue
            },
            weightUnit: {
                value: userWeight.weightUnit
            }
        }
    });

    const getHeightValue = () => {
        switch (getViewStateFieldValue(viewState, "heightUnit")) {
            case HeightUnit.Feet:
                return parseFloat(getViewStateFieldValue(viewState, "heightFeetValue") + "." + getViewStateFieldValue(viewState, "heightInchesValue")) || undefined;
            case HeightUnit.Meters:
                return parseFloat(getViewStateFieldValue(viewState, "heightMetersValue")) || undefined;
        }
    }

    const getWeightValue = () => {
        switch (getViewStateFieldValue(viewState, "weightUnit")) {
            case WeightUnit.Pounds:
                return parseInt(getViewStateFieldValue(viewState, "weightPoundsValue")) || undefined;
            case WeightUnit.Kg:
                return parseInt(getViewStateFieldValue(viewState, "weightKgValue")) || undefined;
        }
    }

    const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const key = event.currentTarget.getAttribute("data-statekey");
        var numberRegex = /^-?\d*$/;
        var meterRegex = /^-?\d{1,1}(\.\d{0,2})?$/;
        if ((key === "heightFeetValue" || key === "heightInchesValue" || key === "weightPoundsValue" || key === "weightKgValue")
            && !numberRegex.test(event.target.value)) {
            return;
        }
        if (key === "heightMetersValue" && event.target.value && !meterRegex.test(event.target.value)) {
            return;
        }
        setViewState(setViewStateFieldValue(viewState, key as string, event.currentTarget.value));
    }

    const checkFieldsChanged = () => {
        if (user.data.height?.unit !== getViewStateFieldValue(viewState, "heightUnit")) {
            return true;
        }
        if (user.data.height?.value != getHeightValue()) {
            return true;
        }
        if (user.data.weight?.unit !== getViewStateFieldValue(viewState, "weightUnit")) {
            return true;
        }
        if (user.data.weight?.value != getWeightValue()) {
            return true;
        }
        return false;
    }

    const verifyAndSubmit = async () => {
        let heightErrors = validateFieldData("Height Unit", getViewStateFieldValue(viewState, "heightUnit"), true, []);
        switch (getViewStateFieldValue(viewState, "heightUnit")) {
            case HeightUnit.Feet:
                heightErrors.push(...validateFieldData("Height value", parseInt(getViewStateFieldValue(viewState, "heightFeetValue")), true, [
                    {
                        type: ValidationType.Min,
                        testCondition: 5
                    },
                    {
                        type: ValidationType.Max,
                        testCondition: 7
                    }
                ]));
                heightErrors.push(...validateFieldData("Height value", parseInt(getViewStateFieldValue(viewState, "heightInchesValue")), true, [
                    {
                        type: ValidationType.Min,
                        testCondition: 0
                    },
                    {
                        type: ValidationType.Max,
                        testCondition: 11
                    }
                ]));
                break;
            case HeightUnit.Meters:
                heightErrors.push(...validateFieldData("Height value", getHeightValue() ?? "", true, [
                    {
                        type: ValidationType.Min,
                        testCondition: 1
                    },
                    {
                        type: ValidationType.Max,
                        testCondition: 2.50
                    }
                ]));
                break;
        }
        let weightErrors = validateFieldData("Weight Unit", getViewStateFieldValue(viewState, "weightUnit"), true, []);
        switch (getViewStateFieldValue(viewState, "weightUnit")) {
            case WeightUnit.Pounds:
                weightErrors.push(...validateFieldData("Weight value", getWeightValue() ?? "", true, [
                    {
                        type: ValidationType.Min,
                        testCondition: 60
                    },
                    {
                        type: ValidationType.Max,
                        testCondition: 400
                    }
                ]));
                break;
            case WeightUnit.Kg:
                weightErrors.push(...validateFieldData("Weight value", getWeightValue() ?? "", true, [
                    {
                        type: ValidationType.Min,
                        testCondition: 30
                    },
                    {
                        type: ValidationType.Max,
                        testCondition: 200
                    }
                ]));
                break;
        }
        setViewState((state) => setViewStateFieldErrorMessage(state, "heightUnit", heightErrors[0]));
        setViewState((state) => setViewStateFieldErrorMessage(state, "weightUnit", weightErrors[0]));

        const api = new Api({
            baseURL: ApiBaseUrl
        });
        const totalErrors = [...heightErrors, ...weightErrors];
        if (totalErrors.length === 0) {
            setViewState((state) => setViewStateStatus(state, ViewStatus.Saving));
            // Check if Profile Picture was Changed
            if (profilePic !== userProfilePicture) {
                if (profilePic) {
                    try {
                        await api.members.uploadMemberProfilePicture(
                            MemberIdMeParameter.TypeMe,
                            {
                                profilePicture: profilePic
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
                            height: {
                                unit: viewState.fields.heightUnit.value as HeightUnit,
                                value: getHeightValue() as number
                            },
                            weight: {
                                unit: viewState.fields.weightUnit.value as WeightUnit,
                                value: getWeightValue() as number
                            }
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

    const renderErrorMessage = (errorMessage?: string) => {
        return errorMessage &&
            <div className="py-2 flex items-center justify-center">
                <AiFillCloseCircle size="24" />
                <div className="px-2 text-sm text-left">
                    {errorMessage}
                </div>
            </div>
    }

    return (
        <RenderViewState state={viewState}>
            <ProfileImageUploader image={profilePic} onChange={(file) => setProfilePic(file)} />
            <div className="pt-4">
                Height
                <div className="flex flex-col gap-x-4 lg:flex-row items-center justify-center w-2/3 mx-auto">
                    <SelectField items={Object.keys(HeightUnit)} hideDefault={true} label="Unit" stateKey="heightUnit" className="py-2" value={getViewStateFieldValue(viewState, "heightUnit")} onChange={handleInputChange} />
                    {getViewStateFieldValue(viewState, "heightUnit") === HeightUnit.Meters
                        ? <InputField stateKey="heightMetersValue" placeholder="ex. 1.95 m" className="py-2 lg:w-2/3" maxLength={4} label="Meters" value={getViewStateFieldValue(viewState, "heightMetersValue")} onChange={handleInputChange} />
                        : <>
                            <InputField stateKey="heightFeetValue" placeholder="ex. 5'" maxLength={1} className="py-2 lg:w-1/3" label="Feet" value={getViewStateFieldValue(viewState, "heightFeetValue")} onChange={handleInputChange} />
                            <InputField stateKey="heightInchesValue" placeholder="ex. 7 in" maxLength={2} className="py-2 lg:w-1/3" label="Inches" value={getViewStateFieldValue(viewState, "heightInchesValue")} onChange={handleInputChange} />
                        </>
                    }
                </div>
                {renderErrorMessage(getViewStateFieldErrorMessage(viewState, "heightUnit"))}
            </div>
            <div className="pt-4">
                Weight
                <div className="flex flex-col gap-x-4 lg:flex-row items-center justify-center w-2/3 mx-auto">
                    <SelectField items={Object.keys(WeightUnit)} hideDefault={true} label="Unit" stateKey="weightUnit" className="py-2" value={getViewStateFieldValue(viewState, "weightUnit")} onChange={handleInputChange} />
                    {getViewStateFieldValue(viewState, "weightUnit") === WeightUnit.Pounds
                        ? <InputField stateKey="weightPoundsValue" placeholder="ex. 1.95 m" className="py-2 lg:w-2/3" maxLength={4} label="Pounds" value={getViewStateFieldValue(viewState, "weightPoundsValue")} onChange={handleInputChange} />
                        : <InputField stateKey="weightKgValue" placeholder="ex. 1.95 m" className="py-2 lg:w-2/3" maxLength={4} label="Kilograms" value={getViewStateFieldValue(viewState, "weightKgValue")} onChange={handleInputChange} />
                    }
                </div>
                {renderErrorMessage(getViewStateFieldErrorMessage(viewState, "weightUnit"))}
            </div>
            <EditButtons submitName={props.submitName} cancelName={props.cancelName} onCancelClick={() => props.onBackClick()} onSubmitClick={verifyAndSubmit} />
        </RenderViewState>
    );
}