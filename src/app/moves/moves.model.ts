import {
  ResourceAmount,
  ResourceBundle,
  ResourceRange,
  ResourceType,
} from '../resources/resources.model';
import { DiscoveryType } from '../skills/skills.model';

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
  discovery: string | null;
}

export interface MoveCooldown {
  onCooldown: boolean;
  ticksStart: number | null;
  ticksFinish: number | null;
  animation: number | null;
}

export type PossibleOutcome = ResourceAmount | ResourceRange | Discovery; // expands to cover all possible results of move usage.

export interface Discovery {
  discoveryType: DiscoveryType;
}
