import { createAction, props } from '@ngrx/store';
import { GameMove, MoveCooldown } from 'src/app/moves/moves.model';

export const useMove = createAction(
    '[Moves] Use',
    props<{ gameMove: GameMove }>()
);

export const putMoveOnCooldown = createAction(
    '[Moves] Put On Cooldown',
    props<{ gameMove: GameMove, moveCooldown: MoveCooldown }>()
);

export const takeMoveOffCooldown = createAction(
    '[Moves] Take Off Cooldown',
    props<{ gameMove: GameMove }>()
);

export const resetAllMoves = createAction(
    '[Moves] Reset All Moves',
);