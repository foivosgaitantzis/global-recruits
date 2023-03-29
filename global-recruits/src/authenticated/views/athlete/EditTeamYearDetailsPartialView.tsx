import { DateTime } from "luxon";
import { ChangeEvent, ForwardedRef, forwardRef, useImperativeHandle, useState } from "react";
import InputField from "../../../shared/fields/components/InputField";
import SelectField from "../../../shared/fields/components/SelectField";
import { ValidationType } from "../../../shared/fields/models";
import validateFieldData from "../../../shared/fields/validators";
import { ActionType, AthleteTeamYear, PatchAthleteTeamYear } from "../../../shared/specification/GlobalRecruits";
import { getViewStateFieldErrorMessage, getViewStateFieldValue, RenderViewState, setViewStateErrorMessage, setViewStateFieldErrorMessage, setViewStateFieldValue } from "../helper";
import { ViewState, ViewStatus } from "../models";

function mapPatchRequest(viewState: ViewState, deleted?: boolean, teamYear?: AthleteTeamYear): PatchAthleteTeamYear {
    let action: ActionType = ActionType.Add
    if (deleted) {
        action = ActionType.Delete
    } else {
        if (teamYear?.id) {
            action = ActionType.Edit
        }
    }
    return {
        id: teamYear?.id,
        action,
        data: {
            year: parseInt(getViewStateFieldValue(viewState, 'year')),
            stats: {
                avgPpg: parseFloat(getViewStateFieldValue(viewState, 'avgPpg')),
                avgApg: parseFloat(getViewStateFieldValue(viewState, 'avgApg')),
                avgRpg: parseFloat(getViewStateFieldValue(viewState, 'avgRpg'))
            }
        }
    }
    
}

interface EditTeamYearDetailsPartialViewProps {
    teamYear?: AthleteTeamYear,
}

export const EditTeamYearDetailsPartialView = forwardRef((props: EditTeamYearDetailsPartialViewProps, ref: ForwardedRef<any>) => {
    const [viewState, setViewState] = useState<ViewState>({
        status: ViewStatus.Loaded,
        fields: {
            year: {
                value: props.teamYear?.data.year.toString() ?? ""
            },
            avgPpg: {
                value: props.teamYear?.data.stats.avgPpg.toString() ?? ""
            },
            avgApg: {
                value: props.teamYear?.data.stats.avgApg.toString() ?? ""
            },
            avgRpg: {
                value: props.teamYear?.data.stats.avgRpg.toString() ?? ""
            }
        }
    });

    const checkFieldsChanged = () => {
        if (props.teamYear?.data.year.toString() !== getViewStateFieldValue(viewState, "year")) {
            return true;
        }
        if (props.teamYear?.data.stats.avgPpg.toString() !== getViewStateFieldValue(viewState, "avgPpg")) {
            return true;
        }
        if (props.teamYear?.data.stats.avgApg.toString() !== getViewStateFieldValue(viewState, "avgApg")) {
            return true;
        }
        if (props.teamYear?.data.stats.avgRpg.toString() !== getViewStateFieldValue(viewState, "avgRpg")) {
            return true;
        }
        return false;
    }

    const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const key = event.currentTarget.getAttribute("data-statekey") as string;
        const value = event.currentTarget.value;
        setViewState((state) => setViewStateFieldValue(state, key, value));
    }

    const getYearArray = (year?: number) => {
        const currentYear = year ?? DateTime.now().year;
        return Array.from({ length: ((currentYear - 5) - (currentYear)) / -1 }, (_, i) => (currentYear) + (i * -1));
    }

    useImperativeHandle(ref, () => ({
        validateAndReturn() {
            const yearErrors = validateFieldData("Year", getViewStateFieldValue(viewState, "year"), true, []);
            const avgPpgErrors = validateFieldData("Average Points per Game", parseFloat(getViewStateFieldValue(viewState, "avgPpg")), true, [
                {
                    type: ValidationType.Min,
                    testCondition: 0
                },
                {
                    type: ValidationType.Max,
                    testCondition: 100
                }
            ]);
            const avgApgErrors = validateFieldData("Average Assists per Game", parseFloat(getViewStateFieldValue(viewState, "avgApg")), true, [
                {
                    type: ValidationType.Min,
                    testCondition: 0
                },
                {
                    type: ValidationType.Max,
                    testCondition: 50
                }
            ]);
            const avgRpgErrors = validateFieldData("Average Rebounds per Game", parseFloat(getViewStateFieldValue(viewState, "avgRpg")), true, [
                {
                    type: ValidationType.Min,
                    testCondition: 0
                },
                {
                    type: ValidationType.Max,
                    testCondition: 50
                }
            ]);
            setViewState((state) => setViewStateFieldErrorMessage(state, 'year', yearErrors[0]))
            setViewState((state) => setViewStateFieldErrorMessage(state, 'avgPpg', avgPpgErrors[0]))
            setViewState((state) => setViewStateFieldErrorMessage(state, 'avgApg', avgApgErrors[0]));
            setViewState((state) => setViewStateFieldErrorMessage(state, 'avgRpg', avgRpgErrors[0]));
            const totalErrors = [...yearErrors, ...avgPpgErrors, ...avgApgErrors, ...avgRpgErrors];
            if (totalErrors.length === 0) {
                if (checkFieldsChanged()) {
                    return mapPatchRequest(viewState, false, props.teamYear);
                }
            } else {
                return false;
            }
        }
     }));

    return (
        <RenderViewState state={viewState}>
            <div className="flex flex-col gap-x-4 lg:flex-row justify-center">
                <SelectField required={true} items={getYearArray().map(year => year.toString())} stateKey="year" label="Year" className="py-2 lg:w-1/2" value={getViewStateFieldValue(viewState, "year")} errorMessage={getViewStateFieldErrorMessage(viewState, "year")} onChange={handleInputChange} />
            </div>
            <div className="flex flex-col gap-x-4 lg:flex-row justify-center">
                <InputField required={true} stateKey="avgPpg" label="Avg. PPG" className="py-2" value={getViewStateFieldValue(viewState, "avgPpg")} errorMessage={getViewStateFieldErrorMessage(viewState, "avgPpg")} onChange={handleInputChange} />
                <InputField required={true} stateKey="avgApg" label="Avg. APG" className="py-2" value={getViewStateFieldValue(viewState, "avgApg")} errorMessage={getViewStateFieldErrorMessage(viewState, "avgApg")} onChange={handleInputChange} />
                <InputField required={true} stateKey="avgRpg" label="Avg. RPG" className="py-2" value={getViewStateFieldValue(viewState, "avgRpg")} errorMessage={getViewStateFieldErrorMessage(viewState, "avgRpg")} onChange={handleInputChange} />
            </div>
        </RenderViewState>
    )
});