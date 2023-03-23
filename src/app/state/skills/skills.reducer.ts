import { Action, createReducer, on } from '@ngrx/store';
import { SkillTree } from 'src/app/skills/skills.model';
import { SkillsState } from '../app.state';
import * as gameActions from '../game/game.actions';
import * as actions from './skills.actions';

export const initialState: SkillsState = {
  discoveredSkills: [],
  visibleTree: SkillTree.wizardry,
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
  })),

  on(actions.setVisibleSkillTree, (state, { tree }) => ({
    ...state,
    visibleTree: tree,
  }))
);

export function skillsReducer(state: SkillsState | undefined, action: Action) {
  return featureReducer(state, action);
}
