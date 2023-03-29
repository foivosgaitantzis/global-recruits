import { DateTime } from "luxon";
import { ChangeEvent, useRef, useState } from "react";
import Button from "../../../shared/components/Button";
import InputField from "../../../shared/fields/components/InputField";
import SelectField from "../../../shared/fields/components/SelectField";
import { ValidationType } from "../../../shared/fields/models";
import validateFieldData from "../../../shared/fields/validators";
import { ApiBaseUrl } from "../../../shared/helpers/loadEnvironmentVariables";
import { CountryList } from "../../../shared/models/CountryList";
import { ActionType, Api, AthleteTeam, AthleteTeamYear, CollegeSubType, MemberIdMeParameter, PatchAthleteTeamYear, PositionType, TeamType } from "../../../shared/specification/GlobalRecruits";
import EditButtons from "../EditButtons";
import { getViewStateFieldErrorMessage, getViewStateFieldValue, getViewStatePage, RenderViewState, setViewStateErrorMessage, setViewStateFieldErrorMessage, setViewStateFieldValue, setViewStatePage } from "../helper";
import { ViewState, ViewStatus } from "../models";
import { EditTeamYearDetails } from "./EditTeamYearDetails";
import { EditTeamYearDetailsPartialView } from "./EditTeamYearDetailsPartialView";

export interface EditTeamDetailsProps {
    team?: AthleteTeam,
    submitName: string,
    cancelName: string,
    onBackClick: () => void,
    onSubmitClick: (changed: boolean) => void
}

export default function EditTeamDetails(props: EditTeamDetailsProps) {
    const [viewState, setViewState] = useState<ViewState>({
        status: ViewStatus.Loaded,
        viewPage: 1,
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
                value: props.team?.data.name ?? ""
            },
            position: {
                value: props.team?.data.position ?? ""
            },
            country: {
                value: props.team?.data.country ?? ""
            },
            city: {
                value: props.team?.data.city ?? ""
            }
        }
    });

    const [teamYears, setTeamYears] = useState<any[]>(Array(1).fill(undefined));
    const teamYearRefs = useRef<any>([]);


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
                return <SelectField required={true} items={getYearArray().map(year => year.toString())} stateKey="classOf" label="Class Of" className="py-2 lg:w-1/2" value={getViewStateFieldValue(viewState, "classOf")} errorMessage={getViewStateFieldErrorMessage(viewState, "classOf")} onChange={handleInputChange} />
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

    const verifyAndSubmit = async () => {
        const textRegex = /^[a-zA-Z ]*$/;
        let totalErrors: string[] = [];
        let teamYearsPatch: PatchAthleteTeamYear[] = [];
        switch (getViewStatePage(viewState)) {
            case 1:
                const teamTypeErrors = validateFieldData("Team Type", getViewStateFieldValue(viewState, "type"), true, []);
                let teamSubTypeErrors: string[] = [];
                let classOfErrors: string[] = [];
                let schoolNameErrors: string[] = [];
                let divisionErrors: string[] = [];
                const teamNameErrors = validateFieldData("Team Name", getViewStateFieldValue(viewState, "name"), true, [
                    {
                        type: ValidationType.MinLength,
                        testCondition: 2
                    },
                    {
                        type: ValidationType.MaxLength,
                        testCondition: 50
                    }
                ]);
                const positionErrors = validateFieldData("Position", getViewStateFieldValue(viewState, "position"), true, [
                    {
                        type: ValidationType.MinLength,
                        testCondition: 2
                    },
                    {
                        type: ValidationType.MaxLength,
                        testCondition: 50
                    }
                ]);
                const cityErrors = validateFieldData("City", getViewStateFieldValue(viewState, "city"), false, [
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
                switch (getViewStateFieldValue(viewState, "type")) {
                    case TeamType.HighSchool:
                    case TeamType.ElementarySchool:
                    case TeamType.MiddleSchool:
                    case TeamType.PrepSchool:
                        classOfErrors = validateFieldData("Class Of", getViewStateFieldValue(viewState, "classOf"), true, []);
                        schoolNameErrors = validateFieldData("School Name", getViewStateFieldValue(viewState, "school"), false, [
                            {
                                type: ValidationType.MinLength,
                                testCondition: 2
                            },
                            {
                                type: ValidationType.MaxLength,
                                testCondition: 50
                            }
                        ]);
                        break;
                    case TeamType.College:
                        teamSubTypeErrors = validateFieldData("Team Sub Type", getViewStateFieldValue(viewState, "subType"), true, []);
                        schoolNameErrors = validateFieldData("School Name", getViewStateFieldValue(viewState, "school"), false, [
                            {
                                type: ValidationType.MinLength,
                                testCondition: 2
                            },
                            {
                                type: ValidationType.MaxLength,
                                testCondition: 50
                            }
                        ]);
                        break;
                }
                const subType = getViewStateFieldValue(viewState, "subType");
                if (subType === CollegeSubType.Ncaa || subType === CollegeSubType.Njcaa) {
                    divisionErrors = validateFieldData("Division", getViewStateFieldValue(viewState, "division"), true, []);
                }
                setViewState((state) => setViewStateFieldErrorMessage(state, "type", teamTypeErrors[0]));
                setViewState((state) => setViewStateFieldErrorMessage(state, "subType", teamSubTypeErrors[0]));
                setViewState((state) => setViewStateFieldErrorMessage(state, "classOf", classOfErrors[0]));
                setViewState((state) => setViewStateFieldErrorMessage(state, "school", schoolNameErrors[0]));
                setViewState((state) => setViewStateFieldErrorMessage(state, "division", divisionErrors[0]));
                setViewState((state) => setViewStateFieldErrorMessage(state, "name", teamNameErrors[0]));
                setViewState((state) => setViewStateFieldErrorMessage(state, "position", positionErrors[0]));
                setViewState((state) => setViewStateFieldErrorMessage(state, "city", cityErrors[0]));
                totalErrors = [...teamTypeErrors, ...teamSubTypeErrors, ...classOfErrors, ...schoolNameErrors, ...divisionErrors, ...teamNameErrors, ...positionErrors, ...cityErrors];
                break;
            case 2:
                const results = [];
                for (const item of teamYearRefs.current) {
                    const result = item.validateAndReturn();
                    if (result === false) {
                        return;
                    }
                    results.push(result);
                }
                teamYearsPatch = results.filter(Boolean);
                break;
        }
        if (totalErrors.length === 0) {
            const api = new Api({
                baseURL: ApiBaseUrl
            });
            if (props.team?.id) {
                // Edit Operation
            } else {
                switch (getViewStatePage(viewState)) {
                    case 1:
                        setViewState((state) => setViewStatePage(state, 2));
                        break;
                    case 2:
                        // Add If Check Fields Changed
                        try {
                            await api.members.updateMemberDetails(MemberIdMeParameter.TypeMe, {
                                type: "athlete",
                                data: {
                                    teams: [
                                        {
                                            action: ActionType.Add,
                                            data: {
                                                type: getViewStateFieldValue(viewState, "type") as TeamType,
                                                subType: getViewStateFieldValue(viewState, "subType") as CollegeSubType || undefined,
                                                division: parseInt(getViewStateFieldValue(viewState, "division")) || undefined,
                                                classOf: parseInt(getViewStateFieldValue(viewState, "classOf")) || undefined,
                                                school: getViewStateFieldValue(viewState, "school") || undefined,
                                                name: getViewStateFieldValue(viewState, "name"),
                                                position: getViewStateFieldValue(viewState, "position") as PositionType,
                                                country: getViewStateFieldValue(viewState, "country") || undefined,
                                                city: getViewStateFieldValue(viewState, "city") || undefined,
                                                years: teamYearsPatch
                                            }
                                        }
                                    ]
                                }
                            });
                            props.onSubmitClick(true);
                        } catch (error: any) {
                            setViewState((state) => setViewStateErrorMessage(state, "An Unexpected Error has Occured. Please try again Later."))
                        }
                        break;
                }
            }
        }
    }

    const onBackClick = () => {
        switch (getViewStatePage(viewState)) {
            case 1:
                props.onBackClick();
                break;
            case 2:
                setViewState((state) => setViewStatePage(state, 1));
                break;
        }
    }

    const renderPage = () => {
        switch (getViewStatePage(viewState)) {
            case 1:
                return <>
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
                </>
            case 2:
                return <>
                    {teamYears.map((item, i) => {
                        return <div className="border-b border-black p-4">
                            <EditTeamYearDetailsPartialView key={i} ref={ty => teamYearRefs.current[i] = ty} teamYear={props.team?.data.years?.[i]} />
                        </div>
                    })}
                    <Button className="mt-4" text="Add Year" onClick={() => setTeamYears([...teamYears, undefined])} />
                </>
        }
    }

    return (
        <RenderViewState state={viewState}>
            {renderPage()}
            <EditButtons submitName={props.submitName} cancelName={props.cancelName} onCancelClick={onBackClick} onSubmitClick={verifyAndSubmit} />
        </RenderViewState>
    )
}