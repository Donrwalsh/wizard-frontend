import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import * as gameActions from '../game/game.actions';
import * as movesActions from '../moves/moves.actions';
import * as timeSelectors from '../game/game.selector';
import * as eventsActions from './events.actions';
import { EventsService } from 'src/app/services/events.service';

@Injectable()
export class EventsEffects {
  constructor(
    private actions$: Actions,
    private store: Store,
    private eventsService: EventsService
  ) {}

  useMove$ = createEffect(() =>
    this.actions$.pipe(
      ofType(movesActions.useMove),
      concatLatestFrom(() => [this.store.select(timeSelectors.selectTicks)]),
      map(([action, ticks]) =>
        eventsActions.logEvent({
          event: this.eventsService.createGameEvent(
            ticks,
            action.move,
            action.outcome
          ),
        })
      )
    )
  );

  restart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(gameActions.restart),
      map(() =>
        eventsActions.logEvent({
          event: this.eventsService.createRestartEvent(),
        })
      )
    )
  );

  finish$ = createEffect(() =>
    this.actions$.pipe(
      ofType(gameActions.finish),
      concatLatestFrom(() => [this.store.select(timeSelectors.selectTicks)]),
      map(([action, ticks]) =>
        eventsActions.logEvent({
          event: this.eventsService.createFinishEvent(ticks),
        })
      )
    )
  );
}
