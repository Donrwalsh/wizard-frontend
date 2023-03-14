import { Action, createReducer, on } from "@ngrx/store";
import { EventsState } from "../app.state";
import * as actions from './events.actions';
import * as gameActions from '../game/game.actions';

export const initialState: EventsState = {
    eventsLog: []
}

const featureReducer = createReducer(
    initialState,
    on(gameActions.restart, () => (initialState)),

    on(actions.logEvent, (state, { event }) => ({
        ...state,
        eventsLog: [...state.eventsLog, event]
    })),
)

export function eventsReducer(state: EventsState | undefined, action: Action) {
    return featureReducer(state, action);
}