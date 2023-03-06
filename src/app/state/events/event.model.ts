import { Move, MovesType } from "src/app/moves/moves.model";


//TODO: move out of state
export class GameEvent {
    when: number; //in ticks
    what: Move; //store entire object?
    description: string

    constructor(ticks: number, move: Move) {
        this.when = ticks;
        this.what = move;
        // this.description = move.eventDescription;
        this.description = "+1 Mana";
      }
}