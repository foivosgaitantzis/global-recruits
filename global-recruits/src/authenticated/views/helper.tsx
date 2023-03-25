
import { LoadingSpinner } from "../../shared/pages/LoadingPage";
import { ViewState, ViewStatus } from "./models";
import { ReactNode } from "react"
import { AiFillCloseCircle } from "react-icons/ai";

interface ViewStateProps {
    state: ViewState,
    children: ReactNode
}

export function RenderViewState(props: ViewStateProps) {
    const renderElement = () => {
        switch (props.state.status) {
            case ViewStatus.Loading:
            case ViewStatus.Saving:
                return <LoadingSpinner />
            case ViewStatus.Error:
                return <>
                    {props.state.errorMessage &&
                        <div className="py-2 flex items-center mx-auto justify-center">
                            <AiFillCloseCircle size="24" />
                            <div className="px-2 text-sm text-left">
                                {props.state.errorMessage}
                            </div>
                        </div>
                    }
                    {props.children}
                </>
            case ViewStatus.Loaded:
                return props.children;
        }
    }
    return <>
        {renderElement()}
    </>
}

export function setViewStateStatus(viewState: ViewState, status: ViewStatus): ViewState {
    return {
        ...viewState,
        status,
        errorMessage: undefined
    }
}

export function setViewStateErrorMessage(viewState: ViewState, errorMessage: string): ViewState {
    return {
        ...viewState,
        status: ViewStatus.Error,
        errorMessage
    }
}

export function setViewStateFieldValue(viewState: ViewState, key: string, value: string): ViewState {
    return {
        ...viewState,
        fields: {
            ...viewState.fields,
            [key]: {
                ...viewState.fields[key],
                value
            }
        }
    }
}

export function getViewStateFieldValue(viewState: ViewState, key: string): string {
    return viewState.fields[key].value;
}

export function setViewStateFieldErrorMessage(viewState: ViewState, key: string, errorMessage?: string): ViewState {
    return {
        ...viewState,
        fields: {
            ...viewState.fields,
            [key]: {
                ...viewState.fields[key],
                errorMessage
            }
        }
    }
}

export function getViewStateFieldErrorMessage(viewState: ViewState, key: string): string | undefined {
    return viewState.fields[key].errorMessage;
}