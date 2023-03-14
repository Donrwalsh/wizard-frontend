import { Move, MovesType } from "src/app/moves/moves.model";
import { ResourceBundle } from "../resources/resources.model";


export enum SystemMessageType {
  exposition = "Exposition"
}

export class GameEvent {
  when: number; //in ticks
  what: MovesType | SystemMessageType;
  result: ResourceBundle | null // only for Focus currently
  description: string

  constructor(ticks: number, what: any, result: ResourceBundle | null, description: string) {
    this.when = ticks;
    this.what = what;
    this.result = result;
    this.description = description;
  }
}