import { createAction, props } from '@ngrx/store';

export const tick = createAction(
    '[Time Component] Tick',
    // props<{ payload: number }>
);

export const resetTick = createAction(
    '[Time Component] Reset Tick',
    // props<{ payload: number }>
);