import {
  ResourceAmount,
  ResourceBundle,
  ResourceRange,
  ResourceType,
} from '../resources/resources.model';

export interface Move {
  type: MovesType;
  cooldown: MoveCooldown;
  // buffs: any[],
}

export enum MovesType {
  focus = 'Focus',
  learn = 'Learn',
  cast = 'Cast',
  mission = 'Mission',
}

export var notOnCooldown: MoveCooldown = {
  onCooldown: false,
  ticksStart: null,
  ticksFinish: null,
  animation: null,
};

export interface MovesData {
  name: string;
  baseCooldown: number;
  baseOutcomes: PossibleOutcome[];
}

export interface MoveOutcome {
  resource: ResourceBundle;
  // discovery?: ~something
}

export interface MoveCooldown {
  onCooldown: boolean;
  ticksStart: number | null;
  ticksFinish: number | null;
  animation: number | null;
}

export type PossibleOutcome = ResourceAmount | ResourceRange; // expands to cover all possible results of move usage.
