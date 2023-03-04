import { Action, createReducer, on } from "@ngrx/store";
import { initialConjureGem, initialFocus, Move, MovesType } from "src/app/moves/moves.model";
import { ResourceAmount, ResourceType } from "src/app/resources/resources.model";
import { MovesState, ResourcesState } from "../app.state";
import * as actions from './moves.actions';

export const initialState: MovesState = {
    focus: initialFocus,
    conjureGem: initialConjureGem
}

const featureReducer = createReducer(
    initialState,

)

export function movesReducer(state: MovesState | undefined, action: Action) {
    return featureReducer(state, action);
}