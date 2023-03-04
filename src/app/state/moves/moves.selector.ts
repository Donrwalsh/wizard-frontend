import { createFeatureSelector, createSelector } from "@ngrx/store";
import { MovesState } from "../app.state";

export const selectMoves = createFeatureSelector<MovesState>('moves');

export const selectFocus = createSelector(
    selectMoves,
    state => state.focus
);

export const selectConjureGem = createSelector(
    selectMoves,
    state => state.conjureGem
);