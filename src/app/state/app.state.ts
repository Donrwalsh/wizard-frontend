import { ActionReducerMap } from "@ngrx/store";
import { resourcesReducer } from "./resources/resources.reducer";
import { timeReducer } from "./time/time.reducer";

export interface TimeState {
    ticks: number;
}

export interface ResourcesState {
    mana: number;
}

export interface AppState {
    time: TimeState;
    resources: ResourcesState;
}

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
    time: timeReducer,
    resources: resourcesReducer
}