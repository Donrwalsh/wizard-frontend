import { createAction, props } from '@ngrx/store';
import { ResourceAmount } from 'src/app/resources/resources.model';

export const generate = createAction(
    '[Resources] Generate',
    props<{ resourceAmount: ResourceAmount }>()
);

export const resetMana = createAction(
    '[Resources] Reset Mana',
);