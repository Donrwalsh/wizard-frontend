import { createAction } from '@ngrx/store';

export const tick = createAction(
    '[Time] Tick',
);

export const resetTick = createAction(
    '[Time] Reset Tick',
);