import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SkillsState } from '../app.state';

export const selectSkills = createFeatureSelector<SkillsState>('skills');

export const selectDiscoveredSkills = createSelector(
  selectSkills,
  (state) => state.discoveredSkills
);

export const selectVisibleTree = createSelector(
  selectSkills,
  (state) => state.visibleTree
);
