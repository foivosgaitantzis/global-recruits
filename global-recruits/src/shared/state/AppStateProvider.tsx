import { createContext, Dispatch, ReactNode, useContext, useReducer } from "react"
import { StateActions } from "./actions/actions";
import { AppStateModel } from "./models/AppStateModel";
import { MemberLoadedStatus } from "./models/MemberLoadedEnum";
import { AppStateReducer } from "./reducers/reducers";

interface AppStateContextProviderProps {
    children: ReactNode,
    initialState: AppStateModel
}

export const StateContext = createContext<AppStateModel | undefined>(undefined);
export const StateDispatchContext = createContext<Dispatch<StateActions> | undefined>(undefined); 

/**
 * App State Context Provider Helper Function
 * @param props Initial State & Children Elements
 * @returns Children Elements Wrapped in the Context Provider
 */
export function AppStateContextProvider(props: AppStateContextProviderProps) {
    const [state, dispatch] = useReducer(AppStateReducer, props.initialState);
    return (
        <StateContext.Provider value={state}>
            <StateDispatchContext.Provider value={dispatch}>
                {props.children}
            </StateDispatchContext.Provider>
        </StateContext.Provider>
    );
}

/**
 * A Helper Function for Using State
 * @returns The State as an AppStateModel
 */
export function useStateContext() {
    return useContext(StateContext) as AppStateModel;
}

export function useStateDispatchContext() {
    return useContext(StateDispatchContext) as Dispatch<StateActions>
}

/**
 * A Helper Function that Creates the Global State on First Load
 * @returns The Initial Global State as an AppStateModel
 */
export function createInitialState(): AppStateModel {
    return {
        memberLoadedStatus: MemberLoadedStatus.LOADING
    }
}