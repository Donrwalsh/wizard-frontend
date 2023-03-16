import { Action, createReducer, on } from '@ngrx/store';
import { SkillsState } from '../app.state';
import * as gameActions from '../game/game.actions';

export const initialState: SkillsState = {
  discoveredSkills: [
    // empty initially
    // {
    //   name: 'Conjuration School',
    //   discovered: false,
    //   unlocked: false,
    // },
    // {
    //   name: 'Enhanced Focus',
    //   discovered: false,
    //   unlocked: false,
    // },
  ],
};

const featureReducer = createReducer(
  initialState,
  on(gameActions.restart, () => initialState)
);

export function skillsReducer(state: SkillsState | undefined, action: Action) {
  return featureReducer(state, action);
}
