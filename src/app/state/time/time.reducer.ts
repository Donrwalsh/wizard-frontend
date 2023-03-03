import { Action, createReducer, on } from "@ngrx/store";
import { TimeState } from "../app.state";
import * as actions from './time.actions';

export const initialState: TimeState = {
    ticks: 0
}

const featureReducer = createReducer(
    initialState,

    on(actions.resetTick, (state: TimeState) => {
        return {
            ...state,
            ticks: 0
        }
    }),

    on(actions.tick, (state: TimeState) => {
        return {
            ...state,
            ticks: state.ticks + 1
        }
    }),


)

export function timeReducer(state: TimeState | undefined, action: Action) {
    return featureReducer(state, action);
}