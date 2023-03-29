import { DateTime } from "luxon";
import { ChangeEvent, useState } from "react";
import InputField from "../../../shared/fields/components/InputField";
import SelectField from "../../../shared/fields/components/SelectField";
import { AthleteTeamYear } from "../../../shared/specification/GlobalRecruits";
import EditButtons from "../EditButtons";
import { getViewStateFieldErrorMessage, getViewStateFieldValue, RenderViewState, setViewStateFieldValue } from "../helper";
import { ViewState, ViewStatus } from "../models";

export interface EditTeamYearDetailsProps {
    teamYear?: AthleteTeamYear,
    submitName: string,
    cancelName: string,
    onBackClick: () => void,
    onSubmitClick: (changed: boolean) => void
}

export function EditTeamYearDetails(props: EditTeamYearDetailsProps) {
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

    const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const key = event.currentTarget.getAttribute("data-statekey") as string;
        const value = event.currentTarget.value;
        setViewState((state) => setViewStateFieldValue(state, key, value));
    }

    const getYearArray = (year?: number) => {
        const currentYear = year ?? DateTime.now().year;
        return Array.from({ length: ((currentYear - 5) - (currentYear + 5)) / -1 }, (_, i) => (currentYear + 5) + (i * -1));
    }

    const verifyAndSubmit = async () => {
        console.log("Hello")
    }

    return (
        <RenderViewState state={viewState}>
            <div className="text-xl pt-4">Add Most Memorable Stats</div>
            <div className="text-sm pb-4">Don't Worry you can Add More Years Later!</div>
            <div className="flex flex-col gap-x-4 lg:flex-row justify-center">
                <SelectField required={true} items={getYearArray().map(year => year.toString())} stateKey="year" label="Year" className="py-2 lg:w-1/2" value={getViewStateFieldValue(viewState, "year")} errorMessage={getViewStateFieldErrorMessage(viewState, "year")} onChange={handleInputChange} />
            </div>
            <div className="flex flex-col gap-x-4 lg:flex-row justify-center">
                <InputField required={true} stateKey="avgPpg" label="Avg. PPG" className="py-2" value={getViewStateFieldValue(viewState, "avgPpg")} errorMessage={getViewStateFieldErrorMessage(viewState, "avgPpg")} onChange={handleInputChange} />
                <InputField required={true} stateKey="avgApg" label="Avg. APG" className="py-2" value={getViewStateFieldValue(viewState, "avgApg")} errorMessage={getViewStateFieldErrorMessage(viewState, "avgApg")} onChange={handleInputChange} />
                <InputField required={true} stateKey="avgRpg" label="Avg. RPG" className="py-2" value={getViewStateFieldValue(viewState, "avgRpg")} errorMessage={getViewStateFieldErrorMessage(viewState, "avgRpg")} onChange={handleInputChange} />
            </div>
            {/*<EditButtons submitName={props.submitName} cancelName={props.cancelName} onCancelClick={() => props.onBackClick()} onSubmitClick={verifyAndSubmit} />*/}
        </RenderViewState>
    )
}