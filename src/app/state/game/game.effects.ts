import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';

@Injectable()
export class GameEffects {

    // createCooldown$ = createEffect(
    //     () =>
    //         this.actions$.pipe(
    //             ofType(actions.createCooldown),
    //             concatLatestFrom(() => [
    //                 this.store.select(timeSelectors.selectTicks),
    //             ]),
    //             tap(([action, ticks]) => {
    //                 this.store.dispatch(movesActions.putMoveOnCooldown(
    //                     {
    //                         queueItem: {
    //                             type: action.cooldown.type,
    //                             endsAt: action.cooldown.duration + ticks
    //                         }
    //                     }))
    //             })
    //         ),
    //     { dispatch: false }
    // )

    constructor(
        private actions$: Actions,
        private store: Store
    ) { }
}