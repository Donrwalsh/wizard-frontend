import { Action, createReducer, on } from '@ngrx/store';
import { InfoState } from '../app.state';
import * as actions from './info.actions';

export const initialState: InfoState = {
  selected: null,
  type: '',
};

const featureReducer = createReducer(
  initialState,
  on(actions.showMoveInfo, (state, { move }) => ({
    ...state,
    selected: move,
    type: 'Move',
  })),

  on(actions.showSkillInfo, (state, { skill }) => ({
    ...state,
    selected: skill,
    type: 'Skill',
  }))
);

export function infoReducer(state: InfoState | undefined, action: Action) {
  return featureReducer(state, action);
}
