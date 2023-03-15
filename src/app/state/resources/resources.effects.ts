import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import * as moveActions from '../moves/moves.actions';
import * as resourcesActions from './resources.actions';

@Injectable()
export class ResourcesEffects {
  constructor(private actions$: Actions, private store: Store) {}

  useMove$ = createEffect(() =>
    this.actions$.pipe(
      ofType(moveActions.useMove),
      map((action) =>
        resourcesActions.apply({
          resourceBundle: action.outcome.resource,
        })
      )
    )
  );
}
