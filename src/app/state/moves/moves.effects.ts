import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import * as resourcesActions from '../../state/resources//resources.actions';
import * as timeSelectors from '../../state/time/time.selector';
import * as actions from './moves.actions';

@Injectable()
export class MovesEffects {

    useMove$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(actions.useMove),
                concatLatestFrom(() => [
                    this.store.select(timeSelectors.selectTicks),
                    this.store.select(timeSelectors.selectNemesis)
                ]),
                tap(([action, ticks, nemesis]) => {
                    if (ticks < nemesis) {
                        if (action.move.generates !== null) {
                            this.store.dispatch(resourcesActions.generate({
                                resourceAmount: action.move.generates
                            }));
                        }
                    }
                })
            ),
        { dispatch: false }
    );

    constructor(
        private actions$: Actions,
        private store: Store
    ) { }
}