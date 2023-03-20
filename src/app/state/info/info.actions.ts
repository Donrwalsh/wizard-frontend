import { createAction, props } from '@ngrx/store';
import { Move } from 'src/app/moves/moves.model';

export const showMoveInfo = createAction(
  '[Info] Show Move',
  props<{ move: Move }>()
);
