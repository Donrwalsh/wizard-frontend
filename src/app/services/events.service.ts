import { Injectable } from "@angular/core";
import * as copy from "../copy/events";
import { GameEvent, SystemMessageType } from "../events/event.model";
import { GameMove } from "../moves/moves.model";
import { ResourceBundle } from "../resources/resources.model";

@Injectable({ providedIn: 'root' })
export class EventsService {
    constructor() { }

    createGameEvent(ticks: number, gameMove: GameMove, generates: ResourceBundle) {
        return new GameEvent(ticks, gameMove.type, generates, this.writeFocusCopy(gameMove, generates))
    }

    writeFocusCopy(gameMove: GameMove, generates: ResourceBundle): string {
        let output = "You Focus {focus} ";
        if (generates.basicMana == 0 && generates.basicScrolls == 0) {
            output += this.pickOneRandomFrom(copy.focusFailureMessages);
        } else {
            output += `generating ${generates.basicMana} {basic mana} and ${generates.basicScrolls} {basic scrolls}.`
        }
        return output;
    }

    createFinishEvent(ticks: number) {
        return new GameEvent(ticks, SystemMessageType.exposition, null, this.pickOneRandomFrom(copy.finishMessages))
    }

    createRestartEvent() {
        return new GameEvent(0, SystemMessageType.exposition, null, this.pickOneRandomFrom(copy.initialMessages))
    }

    pickOneRandomFrom(array: string[]): string {
        return array[Math.floor(Math.random() * array.length)];
    }


}