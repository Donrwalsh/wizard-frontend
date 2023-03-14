import { createAction, props } from '@ngrx/store';
import { ResourceBundle } from 'src/app/resources/resources.model';

export const generate = createAction(
    '[Resources] Generate',
    props<{ resourceBundle: ResourceBundle }>()
);