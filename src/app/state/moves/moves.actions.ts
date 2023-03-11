import { createAction, props } from '@ngrx/store';
import { GameMove, MoveCooldown } from 'src/app/moves/moves.model';
import { ResourceBundle } from 'src/app/resources/resources.model';

export const prepMove = createAction(
    '[Moves] Prep',
    props<{ gameMove: GameMove }>()
);

export const useMove = createAction(
    '[Moves] Use',
    props<{ gameMove: GameMove, generates: ResourceBundle }>()
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