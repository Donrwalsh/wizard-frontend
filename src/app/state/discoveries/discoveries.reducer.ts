import { Action, createReducer, on } from '@ngrx/store';
import { DiscoveriesState } from '../app.state';
import * as gameActions from '../game/game.actions';
import { DiscoveryTree } from '../../discoveries/discoveries.model';

export const initialState: DiscoveriesState = {
  discoveries: [
    {
      name: 'Conjuration School',
      discovered: false,
      unlocked: false,
    },
    {
      name: 'Enhanced Focus',
      discovered: false,
      unlocked: false,
    },
  ],
};

const featureReducer = createReducer(
  initialState,
  on(gameActions.restart, () => initialState)
);

export function discoveriesReducer(
  state: DiscoveriesState | undefined,
  action: Action
) {
  return featureReducer(state, action);
}
