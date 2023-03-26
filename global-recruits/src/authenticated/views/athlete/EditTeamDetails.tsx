import { DateTime } from "luxon";
import { ChangeEvent, useState } from "react";
import InputField from "../../../shared/fields/components/InputField";
import SelectField from "../../../shared/fields/components/SelectField";
import { CountryList } from "../../../shared/models/CountryList";
import { AthleteTeam, CollegeSubType, PositionType, TeamType } from "../../../shared/specification/GlobalRecruits";
import { getViewStateFieldErrorMessage, getViewStateFieldValue, RenderViewState, setViewStateFieldValue } from "../helper";
import { ViewState, ViewStatus } from "../models";

export interface EditTeamDetailsProps {
    team?: AthleteTeam
}

export default function EditTeamDetails(props: EditTeamDetailsProps) {
    const [viewState, setViewState] = useState<ViewState>({
        status: ViewStatus.Loaded,
        fields: {
            type: {
                value: props.team?.data.type.toString() ?? ""
            },
            school: {
                value: props.team?.data.school?.toString() ?? ""
            },
            subType: {
                value: props.team?.data.subType?.toString() ?? ""
            },
            division: {
                value: props.team?.data.subType?.toString() ?? ""
            },
            classOf: {
                value: props.team?.data.classOf?.toString() ?? ""
            },
            name: {
                value: props.team?.data.name.toString() ?? ""
            },
            position: {
                value: props.team?.data.position.toString() ?? ""
            },
            country: {
                value: props.team?.data.country?.toString() ?? ""
            },
            city: {
                value: props.team?.data.city?.toString() ?? ""
            }
        }
    });

    const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const key = event.currentTarget.getAttribute("data-statekey") as string;
        const value = event.currentTarget.value;
        if (key === "type") {
            setViewState((state) => setViewStateFieldValue(state, "subType", ""));
            setViewState((state) => setViewStateFieldValue(state, "division", ""));
        }
        if (key === "subType") {
            setViewState((state) => setViewStateFieldValue(state, "division", ""));
        }
        setViewState((state) => setViewStateFieldValue(state, key, value));
    }

    const getYearArray = (year?: number) => {
        const currentYear = year ?? DateTime.now().year;
        return Array.from({ length: ((currentYear - 5) - (currentYear + 5)) / -1 }, (_, i) => (currentYear + 5) + (i * -1));
    }

    const renderSubType = () => {
        switch (getViewStateFieldValue(viewState, "type")) {
            case TeamType.HighSchool:
            case TeamType.ElementarySchool:
            case TeamType.MiddleSchool:
            case TeamType.PrepSchool:
                return <SelectField required={true} items={getYearArray().map(year => year.toString())} stateKey="classOf" label="Class Of" className="py-2 lg:w-1/2" value={getViewStateFieldValue(viewState, "classOf")} errorMessage={getViewStateFieldErrorMessage(viewState, "subType")} onChange={handleInputChange} />
            case TeamType.College:
                return <>
                    <SelectField required={true} items={Object.entries(CollegeSubType).map(([key, value]) => ({
                        value,
                        label: key.replace(/([A-Z])/g, ' $1').trim()
                    }))} stateKey="subType" label="College Sub Type" className="py-2 lg:w-1/2" value={getViewStateFieldValue(viewState, "subType")} errorMessage={getViewStateFieldErrorMessage(viewState, "subType")} onChange={handleInputChange} />
                    {renderDivision()}
                </>
        }
    }

    const renderDivision = () => {
        const subType = getViewStateFieldValue(viewState, "subType");
        if (subType === CollegeSubType.Ncaa || subType === CollegeSubType.Njcaa) {
            return <SelectField required={true} items={["1", "2", "3"]} stateKey="division" label="Division" className="py-2 lg:w-1/4" value={getViewStateFieldValue(viewState, "division")} errorMessage={getViewStateFieldErrorMessage(viewState, "division")} onChange={handleInputChange} />
        }
    }

    const renderSchool = () => {
        switch (getViewStateFieldValue(viewState, "type")) {
            case TeamType.HighSchool:
            case TeamType.ElementarySchool:
            case TeamType.MiddleSchool:
            case TeamType.PrepSchool:
            case TeamType.College:
                return <div className="flex flex-col gap-x-4 justify-center lg:flex-row">
                    <InputField stateKey="school" label="School Name" className="py-2 lg:w-1/2" value={getViewStateFieldValue(viewState, "school")} errorMessage={getViewStateFieldErrorMessage(viewState, "school")} onChange={handleInputChange} />
                </div>
        }
    }

    return (
        <RenderViewState state={viewState}>
            <div className="text-xl py-4">Add Team</div>
            <div className="flex flex-col gap-x-4 lg:flex-row justify-center">
                <SelectField items={Object.entries(TeamType).map(([key, value]) => ({
                    value,
                    label: key.replace(/([A-Z])/g, ' $1').trim()
                }))} required={true} stateKey="type" label="Team Type" className="py-2 lg:w-1/2" value={getViewStateFieldValue(viewState, "type")} errorMessage={getViewStateFieldErrorMessage(viewState, "type")} onChange={handleInputChange} />
                {renderSubType()}
            </div>
            {renderSchool()}
            <div className="flex flex-col gap-x-4 lg:flex-row justify-center">
                <InputField required={true} stateKey="name" label="Team Name" className="py-2" value={getViewStateFieldValue(viewState, "name")} errorMessage={getViewStateFieldErrorMessage(viewState, "name")} onChange={handleInputChange} />
                <SelectField required={true} items={Object.entries(PositionType).map(([key, value]) => ({
                    value,
                    label: key.toLocaleUpperCase()
                }))} stateKey="position" label="Your Position" className="py-2" value={getViewStateFieldValue(viewState, "position")} errorMessage={getViewStateFieldErrorMessage(viewState, "position")} onChange={handleInputChange} />
            </div>
            <div className="flex flex-col gap-x-4 lg:flex-row">
                <SelectField items={CountryList} stateKey="country" label="Country" className="py-2" value={getViewStateFieldValue(viewState, "country")} errorMessage={getViewStateFieldErrorMessage(viewState, "country")} onChange={handleInputChange} />
                <InputField stateKey="city" label="City" className="py-2" value={getViewStateFieldValue(viewState, "city")} errorMessage={getViewStateFieldErrorMessage(viewState, "city")} onChange={handleInputChange} />
            </div>
        </RenderViewState>
    )
}