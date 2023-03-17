import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import * as moveActions from '../moves/moves.actions';
import * as skillsActions from './skills.actions';

@Injectable()
export class SkillsEffects {
  constructor(private actions$: Actions, private store: Store) {}

  useMove$ = createEffect(() =>
    this.actions$.pipe(
      ofType(moveActions.useMove),
      map((action) =>
        skillsActions.discover({
          discovery: action.outcome.discovery,
        })
      )
    )
  );
}
