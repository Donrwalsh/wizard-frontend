import { ActionReducerMap } from '@ngrx/store';
import { GameEvent } from '../events/event.model';
import { Move } from '../moves/moves.model';
import { Skill } from '../skills/skills.model';
import { skillsReducer } from './skills/skills.reducer';
import { eventsReducer } from './events/events.reducer';
import { gameReducer } from './game/game.reducer';
import { movesReducer } from './moves/moves.reducer';
import { resourcesReducer } from './resources/resources.reducer';
import { infoReducer } from './info/info.reducer';

export interface SkillsState {
  discoveredSkills: Skill[];
}

export interface InfoState {
  selected: Move | null;
  type: string;
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
  skills: SkillsState;
  events: EventsState;
  game: GameState;
  info: InfoState;
  moves: MovesState;
  resources: ResourcesState;
}

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
  skills: skillsReducer,
  events: eventsReducer,
  game: gameReducer,
  info: infoReducer,
  moves: movesReducer,
  resources: resourcesReducer,
};
