import { createAction, props } from '@ngrx/store';
import { ResourceBundle } from 'src/app/resources/resources.model';

export const discover = createAction(
  '[Skills] Discover',
  props<{ discovery: string | null }>()
);
