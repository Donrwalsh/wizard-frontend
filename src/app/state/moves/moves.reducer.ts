import { Action, createReducer, on } from '@ngrx/store';
import { MovesType, notOnCooldown } from 'src/app/moves/moves.model';
import { MovesState } from '../app.state';
import * as gameActions from '../game/game.actions';
import * as actions from './moves.actions';

export const initialState: MovesState = {
  focus: {
    type: MovesType.focus,
    cooldown: notOnCooldown,
  },
  learn: {
    type: MovesType.learn,
    cooldown: notOnCooldown,
  },
  cast: {
    type: MovesType.cast,
    cooldown: notOnCooldown,
  },
  mission: {
    type: MovesType.mission,
    cooldown: notOnCooldown,
  },
};

const featureReducer = createReducer(
  initialState,
  on(gameActions.restart, () => initialState),

  on(actions.putMoveOnCooldown, (state, { move, moveCooldown }) => ({
    ...state,
    focus:
      move.type === MovesType.focus
        ? { ...state.focus, cooldown: moveCooldown }
        : state.focus,
    learn:
      move.type === MovesType.learn
        ? { ...state.learn, cooldown: moveCooldown }
        : state.learn,
    cast:
      move.type === MovesType.cast
        ? { ...state.cast, cooldown: moveCooldown }
        : state.cast,
    mission:
      move.type === MovesType.mission
        ? { ...state.mission, cooldown: moveCooldown }
        : state.mission,
  })),

  on(actions.takeMoveOffCooldown, (state, { move }) => ({
    ...state,
    focus:
      move.type === MovesType.focus
        ? { ...state.focus, cooldown: notOnCooldown }
        : state.focus,
    learn:
      move.type === MovesType.learn
        ? { ...state.learn, cooldown: notOnCooldown }
        : state.learn,
    cast:
      move.type === MovesType.cast
        ? { ...state.cast, cooldown: notOnCooldown }
        : state.cast,
    mission:
      move.type === MovesType.mission
        ? { ...state.mission, cooldown: notOnCooldown }
        : state.mission,
  }))
);

export function movesReducer(state: MovesState | undefined, action: Action) {
  return featureReducer(state, action);
}
