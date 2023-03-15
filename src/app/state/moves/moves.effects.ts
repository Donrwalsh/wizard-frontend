import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { MovesService } from 'src/app/services/moves.service';
import * as timeSelectors from '../game/game.selector';
import * as movesActions from './moves.actions';

@Injectable()
export class MovesEffects {
  constructor(
    private actions$: Actions,
    private store: Store,
    private movesService: MovesService
  ) {}

  playerClickedMove$ = createEffect(() =>
    this.actions$.pipe(
      ofType(movesActions.playerClickedMove),
      concatLatestFrom(() => [this.store.select(timeSelectors.selectTicks)]),
      map(([action, ticks]) =>
        movesActions.putMoveOnCooldown({
          move: action.move,
          moveCooldown: this.movesService.makeMoveCooldown(action.move, ticks),
        })
      )
    )
  );

  calculateMoveOutcome$ = createEffect(() =>
    this.actions$.pipe(
      ofType(movesActions.playerClickedMove),
      map((action) =>
        movesActions.useMove({
          move: action.move,
          outcome: this.movesService.makeMoveOutcome(action.move),
        })
      )
    )
  );
}
