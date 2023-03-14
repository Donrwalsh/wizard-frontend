import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs';
import * as moveActions from '../moves/moves.actions';
import * as resourcesActions from './resources.actions';

@Injectable()
export class ResourcesEffects {

    useMove$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(moveActions.useMove),
                tap((action) =>
                    this.store.dispatch(resourcesActions.generate({
                        resourceBundle: action.generates
                    }))
                )
            ),
        { dispatch: false }
    )

    constructor(
        private actions$: Actions,
        private store: Store
    ) { }

}