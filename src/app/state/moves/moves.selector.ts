import { createFeatureSelector, createSelector } from "@ngrx/store";
import { MovesState } from "../app.state";

export const selectMoves = createFeatureSelector<MovesState>('moves');

export const selectFocus = createSelector(
    selectMoves,
    state => state.focus
);

export const selectLearn = createSelector(
    selectMoves,
    state => state.learn
);

export const selectCast = createSelector(
    selectMoves,
    state => state.cast
);

export const selectMission = createSelector(
    selectMoves,
    state => state.mission
);