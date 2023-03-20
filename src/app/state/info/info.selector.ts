import { createFeatureSelector, createSelector } from '@ngrx/store';
import { InfoState } from '../app.state';

export const selectInfo = createFeatureSelector<InfoState>('info');

export const selectSelected = createSelector(
  selectInfo,
  (state) => state.selected
);

export const selectTypeSelected = createSelector(
  selectInfo,
  (state) => state.type
);
