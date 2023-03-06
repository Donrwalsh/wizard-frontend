import { createAction, props } from '@ngrx/store';
import { GameEvent } from './event.model';

export const logEvent = createAction(
    '[Events] Log',
    props<{ event: GameEvent }>()
);

export const clearEventsLog = createAction(
    '[Events] Clear Log',
);