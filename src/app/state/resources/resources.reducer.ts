import { Action, createReducer, on } from "@ngrx/store";
import { ResourceAmount, ResourceType } from "src/app/resources/resources.model";
import { ResourcesState } from "../app.state";
import * as actions from './resources.actions';
import * as gameActions from '../game/game.actions';

export const initialState: ResourcesState = {
    mana: 0
}

const featureReducer = createReducer(
    initialState,

    on(actions.generate, (state, { resourceAmount }) => ({
            ...state,
            mana: state.mana + (resourceAmount.type === ResourceType.Mana ? resourceAmount.amount : 0)
    })),

    on(gameActions.restart, (state ) => ({
        ...state,
        mana: 0
    })),
)

export function resourcesReducer(state: ResourcesState | undefined, action: Action) {
    return featureReducer(state, action);
}