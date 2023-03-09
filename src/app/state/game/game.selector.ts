import { createFeatureSelector, createSelector } from "@ngrx/store";
import { GameState } from "../app.state";

export const selectGame = createFeatureSelector<GameState>('game');

export const selectTicks = createSelector(
    selectGame,
    state => state.ticks
);

export const selectNemesis = createSelector(
    selectGame,
    state => state.nemesis
);

export const selectActive = createSelector(
    selectGame,
    state => state.active
)