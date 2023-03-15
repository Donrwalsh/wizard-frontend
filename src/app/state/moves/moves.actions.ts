import { createAction, props } from '@ngrx/store';
import {
  Move,
  MoveCooldown,
  MoveOutcome,
  PossibleOutcome,
} from 'src/app/moves/moves.model';
import { ResourceBundle } from 'src/app/resources/resources.model';

export const playerClickedMove = createAction(
  '[Moves] Player Clicked Move',
  props<{ move: Move }>()
);

export const putMoveOnCooldown = createAction(
  '[Moves] Put On Cooldown',
  props<{ move: Move; moveCooldown: MoveCooldown }>()
);

export const useMove = createAction(
  '[Moves] Use',
  props<{ move: Move; outcome: MoveOutcome }>()
);

export const takeMoveOffCooldown = createAction(
  '[Moves] Take Off Cooldown',
  props<{ move: Move }>()
);

export const resetAllMoves = createAction('[Moves] Reset All Moves');
