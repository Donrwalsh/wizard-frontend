import { Action, createReducer, on } from "@ngrx/store";
import { initialCast, initialFocus, initialLearn, initialMission, MovesType, notOnCooldown } from "src/app/moves/moves.model";
import { MovesState } from "../app.state";
import * as gameActions from '../game/game.actions';
import * as actions from './moves.actions';

export const initialState: MovesState = {
    focus: initialFocus,
    learn: initialLearn,
    cast: initialCast,
    mission: initialMission
}

const featureReducer = createReducer(
    initialState,
    on(gameActions.restart, () => (initialState)),

    on(actions.putMoveOnCooldown, (state, { gameMove, moveCooldown }) => ({
        ...state,
        focus: gameMove.type === MovesType.focus ? { ...state.focus, cooldown: moveCooldown } : state.focus,
        learn: gameMove.type === MovesType.learn ? { ...state.learn, cooldown: moveCooldown } : state.learn,
        cast: gameMove.type === MovesType.cast ? { ...state.cast, cooldown: moveCooldown } : state.cast,
        mission: gameMove.type === MovesType.mission ? { ...state.mission, cooldown: moveCooldown } : state.mission,
    })),

    on(actions.takeMoveOffCooldown, (state, { gameMove }) => ({
        ...state,
        focus: gameMove.type === MovesType.focus ? { ...state.focus, cooldown: notOnCooldown } : state.focus,
        learn: gameMove.type === MovesType.learn ? { ...state.learn, cooldown: notOnCooldown } : state.learn,
        cast: gameMove.type === MovesType.cast ? { ...state.cast, cooldown: notOnCooldown } : state.cast,
        mission: gameMove.type === MovesType.mission ? { ...state.mission, cooldown: notOnCooldown } : state.mission,

    })),

)

export function movesReducer(state: MovesState | undefined, action: Action) {
    return featureReducer(state, action);
}