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

    on(actions.putMoveOnCooldown, (state, { gameMove, readyAt }) => ({
        ...state,
        focus: gameMove.type === MovesType.focus ? { ...state.focus, onCooldown: true, readyAt } : state.focus,
        conjureGem: gameMove.type === MovesType.conjureGem ? { ...state.conjureGem, onCooldown: true, readyAt } : state.conjureGem
    })),

    on(actions.takeMoveOffCooldown, (state, { gameMove }) => ({
        ...state,
        focus: gameMove.type === MovesType.focus ? { ...state.focus, onCooldown: false, readyAt: null } : state.focus,
        conjureGem: gameMove.type === MovesType.conjureGem ? { ...state.conjureGem, onCooldown: false, readyAt: null } : state.conjureGem
    })),

    on (actions.resetAllMoves, (state) => ({
        ...state,
        focus: initialFocus,
        conjureGem: initialConjureGem
    })),

)

export function movesReducer(state: MovesState | undefined, action: Action) {
    return featureReducer(state, action);
}