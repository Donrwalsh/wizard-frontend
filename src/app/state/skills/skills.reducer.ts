import { Action, createReducer, on } from '@ngrx/store';
import { SkillsState } from '../app.state';
import * as gameActions from '../game/game.actions';
import * as actions from './skills.actions';

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
  on(gameActions.restart, () => initialState),

  on(actions.discover, (state, { discovery }) => ({
    ...state,
    discoveredSkills:
      discovery != null
        ? [
            ...state.discoveredSkills,
            {
              name: discovery,
              discovered: true,
              unlocked: false,
            },
          ]
        : state.discoveredSkills,
  }))
);

export function skillsReducer(state: SkillsState | undefined, action: Action) {
  return featureReducer(state, action);
}
