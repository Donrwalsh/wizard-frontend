import { ActionReducerMap } from "@ngrx/store";
import { Move } from "../moves/moves.model";
import { movesReducer } from "./moves/moves.reducer";
import { resourcesReducer } from "./resources/resources.reducer";
import { timeReducer } from "./time/time.reducer";

export interface TimeState {
    nemesis: number;
    ticks: number;
}

export interface ResourcesState {
    mana: number;
}

export interface MovesState {
    focus: Move;
    conjureGem: Move;
}

export interface AppState {
    moves: MovesState;
    resources: ResourcesState;
    time: TimeState;
}

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
    moves: movesReducer,
    resources: resourcesReducer,
    time: timeReducer,
}