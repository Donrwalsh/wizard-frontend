import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import * as eventsActions from '../../state/events/events.actions';
import * as resourcesActions from '../../state/resources/resources.actions';
import * as timeSelectors from '../../state/time/time.selector';
import * as timeActions from '../../state/time/time.actions';
import { GameEvent } from '../events/event.model';
import * as movesActions from './moves.actions';

@Injectable()
export class MovesEffects {

    useMove$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(movesActions.useMove),
                concatLatestFrom(() => [
                    this.store.select(timeSelectors.selectTicks),
                    this.store.select(timeSelectors.selectNemesis)
                ]),
                tap(([action, ticks, nemesis]) => {
                    if (ticks < nemesis) {


                        // Put on Cooldown
                        this.store.dispatch(movesActions.putMoveOnCooldown(
                            { gameMove: action.gameMove, readyAt: ticks + action.gameMove.calculateCooldown() }
                        ));


                        // Log the Event
                        // this.store.dispatch(eventsActions.logEvent({event: new GameEvent(ticks, action.move)}));
                    }
                })
            ),
        { dispatch: false }
    )

    constructor(
        private actions$: Actions,
        private store: Store
    ) { }
}