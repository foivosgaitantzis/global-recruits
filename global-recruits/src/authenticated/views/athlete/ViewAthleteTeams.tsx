import { useState } from "react";
import { RenderViewState } from "../helper"
import { ViewState, ViewStatus } from "../models";
import EditTeamDetails from "./EditTeamDetails";

interface ViewTeamDetailsProps {
    submitName: string,
    cancelName: string,
    onBackClick: () => void,
    onSubmitClick: () => void
}

export default function ViewTeamDetails(props: ViewTeamDetailsProps) {
    const [viewState, setViewState] = useState<ViewState>({
        status: ViewStatus.Loaded,
        fields: {
        }
    });
    return (
        <RenderViewState state={viewState}>
            <EditTeamDetails submitName={props.submitName} cancelName={props.cancelName} onSubmitClick={props.onSubmitClick} onBackClick={props.onBackClick} />
        </RenderViewState>
    )
}