import { ActionReducerMap } from "@ngrx/store";
import { Move } from "../moves/moves.model";
import { GameEvent } from "./events/event.model";
import { eventsReducer } from "./events/events.reducer";
import { movesReducer } from "./moves/moves.reducer";
import { resourcesReducer } from "./resources/resources.reducer";
import { timeReducer } from "./time/time.reducer";

export interface EventsState {
    eventsLog: GameEvent[];
}

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
    events: EventsState;
    moves: MovesState;
    resources: ResourcesState;
    time: TimeState;
}

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
    events: eventsReducer,
    moves: movesReducer,
    resources: resourcesReducer,
    time: timeReducer,
}