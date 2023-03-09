import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import * as eventsActions from '../../state/events/events.actions';
import * as resourcesActions from '../../state/resources/resources.actions';
import * as timeSelectors from '../game/game.selector';
import * as timeActions from '../game/game.actions';
import { GameEvent } from '../events/event.model';
import * as movesActions from './moves.actions';

@Injectable()
export class MovesEffects {

    useMove$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(movesActions.useMove),
                concatLatestFrom(() => [
                    this.store.select(timeSelectors.selectTicks)
                ]),
                tap(([action, ticks]) => {
                    //moves.component has already determined that this move can be used

                    // Put on Cooldown
                    this.store.dispatch(movesActions.putMoveOnCooldown(
                        {
                            gameMove: action.gameMove, moveCooldown: {
                                onCooldown: true,
                                ticksStart: ticks,
                                ticksFinish: ticks + action.gameMove.calculateCooldown(),
                                animation: 1
                            }
                        }
                    ));

                    // Log the event will be handled by Event State, not here
                    // Log the Event
                    // this.store.dispatch(eventsActions.logEvent({event: new GameEvent(ticks, action.move)}));
                })
            ),
        { dispatch: false }
    )

    constructor(
        private actions$: Actions,
        private store: Store
    ) { }
}