import { Action, createReducer, on } from "@ngrx/store";
import { GameState } from "../app.state";
import * as actions from './game.actions';

export const initialState: GameState = {
    active: true,
    ticks: 0,
    nemesis: 3000,
}

const featureReducer = createReducer(
    initialState,

    on(actions.tick, (state: GameState) => {
        return {
            ...state,
            ticks: state.ticks + 1
        }
    }),

    on(actions.restart, (state: GameState) => {
        return {
            ...initialState
        }
    }),

    on(actions.finish, (state: GameState) => {
        return {
            ...state,
            active: false
        }
    }),

)

export function gameReducer(state: GameState | undefined, action: Action) {
    return featureReducer(state, action);
}