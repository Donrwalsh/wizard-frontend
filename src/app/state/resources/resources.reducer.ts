import { Action, createReducer, on } from '@ngrx/store';
import { ResourcesState } from '../app.state';
import * as gameActions from '../game/game.actions';
import * as actions from './resources.actions';

export const initialState: ResourcesState = {
  basicMana: 0,
  basicScrolls: 0,
};

const featureReducer = createReducer(
  initialState,
  on(gameActions.restart, () => initialState),

  on(actions.apply, (state, { resourceBundle }) => ({
    ...state,
    basicMana: state.basicMana + resourceBundle.basicMana,
    basicScrolls: state.basicScrolls + resourceBundle.basicScrolls,
  }))
);

export function resourcesReducer(
  state: ResourcesState | undefined,
  action: Action
) {
  return featureReducer(state, action);
}
