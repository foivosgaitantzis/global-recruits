import { FieldState } from "../../shared/fields/models"

export interface ViewState {
    status: ViewStatus,
    viewPage?: number,
    errorMessage?: string
    fields: {
        [index: string]: FieldState
    }
}

export enum ViewStatus {
    Loading,
    Loaded,
    Saving,
    Error
}