import { Action, createReducer, on } from "@ngrx/store";
import { EventsState } from "../app.state";
import * as actions from './events.actions';

export const initialState: EventsState = {
    eventsLog: []
}

const featureReducer = createReducer(
    initialState,

    on(actions.logEvent, (state, { event }) => ({
        ...state,
        eventsLog: [...state.eventsLog, event]
    })),

    on(actions.clearEventsLog, (state) => ({
        ...state,
        eventsLog: initialState.eventsLog
    })),

)

export function eventsReducer(state: EventsState | undefined, action: Action) {
    return featureReducer(state, action);
}