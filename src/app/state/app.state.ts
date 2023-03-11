import { ActionReducerMap } from "@ngrx/store";
import { Move } from "../moves/moves.model";
import { GameEvent } from "./events/event.model";
import { eventsReducer } from "./events/events.reducer";
import { movesReducer } from "./moves/moves.reducer";
import { resourcesReducer } from "./resources/resources.reducer";
import { gameReducer } from "./game/game.reducer";

export interface EventsState {
    eventsLog: GameEvent[];
}

export interface GameState {
    active: boolean;
    ticks: number;
    nemesis: number;
}

export interface ResourcesState {
    basicMana: number;
    basicScrolls: number;
}

export interface MovesState {
    focus: Move;
    learn: Move;
    cast: Move;
    mission: Move;
}

export interface AppState {
    events: EventsState;
    game: GameState;
    moves: MovesState;
    resources: ResourcesState;
}

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
    events: eventsReducer,
    game: gameReducer,
    moves: movesReducer,
    resources: resourcesReducer,
}