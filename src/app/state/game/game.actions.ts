import { createAction } from '@ngrx/store';

export const tick = createAction(
    '[Game] Tick',
);

export const restart = createAction(
    '[Game] Restart',
);

export const finish = createAction(
    '[Game] Finish'
)