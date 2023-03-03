import { createFeatureSelector, createSelector } from "@ngrx/store";
import { TimeState } from "../app.state";

export const selectTime = createFeatureSelector<TimeState>('time');

export const selectTicks = createSelector(
    selectTime,
    state => state.ticks
);