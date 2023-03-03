import { ActionReducerMap } from "@ngrx/store";
import { timeReducer } from "./time/time.reducer";

export interface TimeState {
    ticks: number;
}

export interface AppState {
    time: TimeState;
}

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
    time: timeReducer
}