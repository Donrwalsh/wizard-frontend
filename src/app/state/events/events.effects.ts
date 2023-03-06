import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import * as movesActions from '../moves/moves.actions';
import * as timeSelectors from '../time/time.selector';
import * as eventsActions from './events.actions';

@Injectable()
export class EventsEffects {

    useMove$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(movesActions.useMove),
                concatLatestFrom(() => [
                    this.store.select(timeSelectors.selectTicks),
                ]),
                tap(([action, ticks]) => {
                    this.store.dispatch(eventsActions.logEvent(
                        { event: action.gameMove.calcGameEvent(ticks) }
                    ))
                })
            ),
        { dispatch: false }
    )

    constructor(
        private actions$: Actions,
        private store: Store
    ) { }
}