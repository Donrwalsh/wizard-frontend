import { ActionReducerMap } from '@ngrx/store';
import { GameEvent } from '../events/event.model';
import { Move } from '../moves/moves.model';
import { Discovery } from '../discoveries/discoveries.model';
import { discoveriesReducer } from './discoveries/discoveries.reducer';
import { eventsReducer } from './events/events.reducer';
import { gameReducer } from './game/game.reducer';
import { movesReducer } from './moves/moves.reducer';
import { resourcesReducer } from './resources/resources.reducer';

export interface DiscoveriesState {
  discoveries: Discovery[];
}

export interface EventsState {
  eventsLog: GameEvent[];
}

export interface GameState {
  active: boolean;
  ticks: number;
  nemesis: number;
}

export interface ResourcesState {
  basicMana: number;
  basicScrolls: number;
}

export interface MovesState {
  focus: Move;
  learn: Move;
  cast: Move;
  mission: Move;
}

export interface AppState {
  discoveries: DiscoveriesState;
  events: EventsState;
  game: GameState;
  moves: MovesState;
  resources: ResourcesState;
}

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
  discoveries: discoveriesReducer,
  events: eventsReducer,
  game: gameReducer,
  moves: movesReducer,
  resources: resourcesReducer,
};
