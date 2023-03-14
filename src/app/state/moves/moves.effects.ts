import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import { ChaosService } from 'src/app/services/chaos.service';
import * as timeSelectors from '../game/game.selector';
import * as movesActions from './moves.actions';

@Injectable()
export class MovesEffects {

    constructor(
        private actions$: Actions,
        private store: Store,
        private chaosService: ChaosService
    ) { }

    prepMove$ = createEffect(() =>
        this.actions$.pipe(
            ofType(movesActions.prepMove),
            tap((action) => {
                this.store.dispatch(movesActions.useMove({ gameMove: action.gameMove, generates: this.chaosService.resolveOutcomes(action.gameMove) }))
                // this.store.dispatch(movesActions.useMove({
                //     gameMove: action.gameMove, generates: {
                //         basicMana: 1,
                //         basicScrolls: 0
                //     }
                // }))
            })
        ),
        { dispatch: false }
    )

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


}