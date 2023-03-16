import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ResourcesState } from '../app.state';

export const selectResources =
  createFeatureSelector<ResourcesState>('resources');

export const selectBasicMana = createSelector(
  selectResources,
  (state) => state.basicMana
);

export const selectBasicScrolls = createSelector(
  selectResources,
  (state) => state.basicScrolls
);
