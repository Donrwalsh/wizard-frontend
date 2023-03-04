import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ResourcesState } from "../app.state";

export const selectResources = createFeatureSelector<ResourcesState>('resources');

export const selectMana = createSelector(
    selectResources,
    state => state.mana
);