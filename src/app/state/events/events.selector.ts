import { createFeatureSelector, createSelector } from "@ngrx/store";
import { EventsState } from "../app.state";

export const selectEvents = createFeatureSelector<EventsState>('events');

export const selectEventLog = createSelector(
    selectEvents,
    state => state.eventsLog
);