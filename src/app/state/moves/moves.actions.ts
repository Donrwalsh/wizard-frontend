import { createAction, props } from '@ngrx/store';
import { Move, MovesType } from 'src/app/moves/moves.model';
import { ResourceAmount } from 'src/app/resources/resources.model';

export const useMove = createAction(
    '[Moves] Use',
    props<{ move: Move }>()
);