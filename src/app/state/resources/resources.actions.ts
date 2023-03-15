import { createAction, props } from '@ngrx/store';
import { ResourceBundle } from 'src/app/resources/resources.model';

export const apply = createAction(
  '[Resources] Apply',
  props<{ resourceBundle: ResourceBundle }>()
);
