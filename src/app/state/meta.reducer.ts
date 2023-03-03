import { ActionReducer, INIT, MetaReducer, UPDATE } from "@ngrx/store";
import { AppState } from "./app.state";

const STATE_NAME = 'state';

export const hydrationMetaReducer = (
    reducer: ActionReducer<AppState>
): ActionReducer<AppState> => {
    return (state, action) => {
        if (action.type === INIT || action.type === UPDATE) {
            const storageValue = localStorage.getItem(STATE_NAME);
            if (storageValue) {
                try {
                    return JSON.parse(storageValue);
                } catch {
                    localStorage.removeItem(STATE_NAME);
                }
            }
        }
        const nextState = reducer(state, action);
        localStorage.setItem(STATE_NAME, JSON.stringify(nextState));
        return nextState;
    };
};

export const metaReducers: MetaReducer[] = [hydrationMetaReducer];