import { Action, createReducer, on } from "@ngrx/store";
import { initialConjureGem, initialFocus, Move, MovesType, notOnCooldown } from "src/app/moves/moves.model";
import { ResourceAmount, ResourceType } from "src/app/resources/resources.model";
import { MovesState, ResourcesState } from "../app.state";
import * as actions from './moves.actions';

export const initialState: MovesState = {
    focus: initialFocus,
    conjureGem: initialConjureGem
}

const featureReducer = createReducer(
    initialState,

    on(actions.putMoveOnCooldown, (state, { gameMove, moveCooldown }) => ({
        ...state,
        focus: gameMove.type === MovesType.focus ? { ...state.focus, cooldown: moveCooldown } : state.focus,
        conjureGem: gameMove.type === MovesType.conjureGem ? { ...state.conjureGem, cooldown: moveCooldown } : state.conjureGem
    })),

    on(actions.takeMoveOffCooldown, (state, { gameMove }) => ({
        ...state,
        focus: gameMove.type === MovesType.focus ? { ...state.focus, cooldown: notOnCooldown } : state.focus,
        conjureGem: gameMove.type === MovesType.conjureGem ? { ...state.conjureGem, cooldown: notOnCooldown } : state.conjureGem
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