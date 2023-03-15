import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DiscoveriesState } from '../app.state';

export const selectDiscoveries =
  createFeatureSelector<DiscoveriesState>('discoveries');

export const selectUnlockedDiscoveries = createSelector(
  selectDiscoveries,
  (state) =>
    state.discoveries
      .filter((discovery) => discovery.unlocked == true)
      .map((discovery) => discovery.name)
);
