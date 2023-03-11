import { Action, createReducer, on } from "@ngrx/store";
import { ResourceAmount, ResourceType } from "src/app/resources/resources.model";
import { ResourcesState } from "../app.state";
import * as actions from './resources.actions';
import * as gameActions from '../game/game.actions';

export const initialState: ResourcesState = {
    basicMana: 0,
    basicScrolls: 0
}

const featureReducer = createReducer(
    initialState,

    on(actions.generate, (state, { resourceBundle }) => ({
            ...state,
            basicMana: state.basicMana + resourceBundle.basicMana,
            basicScrolls: state.basicScrolls + resourceBundle.basicScrolls
    })),

    on(gameActions.restart, (state ) => ({
        ...state,
        basicMana: 0,
        basicScrolls: 0
    })),
)

export function resourcesReducer(state: ResourcesState | undefined, action: Action) {
    return featureReducer(state, action);
}