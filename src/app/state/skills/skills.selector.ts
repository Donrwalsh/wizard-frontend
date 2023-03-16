import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SkillsState } from '../app.state';

export const selectDiscoveries = createFeatureSelector<SkillsState>('skills');

export const selectDiscoveredSkills = createSelector(
  selectDiscoveries,
  (state) => state.discoveredSkills
);
