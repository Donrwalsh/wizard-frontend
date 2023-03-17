import { Injectable } from '@angular/core';
import * as copy from '../copy/events';
import { GameEvent, SystemMessageType } from '../events/event.model';
import { Move, MoveOutcome, MovesType } from '../moves/moves.model';
import { ResourceBundle } from '../resources/resources.model';
import { MovesService } from './moves.service';

@Injectable({ providedIn: 'root' })
export class EventsService {
  constructor(private movesService: MovesService) {}

  createGameEvent(ticks: number, move: Move, outcome: MoveOutcome) {
    return new GameEvent(
      ticks,
      move.type,
      outcome.resource,
      this.writeMoveCopy(move, outcome)
    );
  }

  writeMoveCopy(move: Move, outcome: MoveOutcome): string {
    switch (move.type) {
      case MovesType.focus: {
        return this.writeFocusCopy(move, outcome.resource);
      }
      case MovesType.learn: {
        return this.writeLearnCopy(move, outcome);
      }
      default: {
        return 'This should never be seen';
      }
    }
  }

  writeLearnCopy(move: Move, outcome: MoveOutcome): string {
    let output = 'You Learn {learn} from ';
    if (outcome.resource.basicScrolls < 0) {
      output += `${Math.abs(outcome.resource.basicScrolls)} {basic scrolls} `;
    }
    output += `discovering the ${outcome.discovery} `;
    output += outcome.discovery?.includes('School') ? `of Magic!` : `spell!`;
    return output;
  }

  writeFocusCopy(move: Move, generates: ResourceBundle): string {
    let output = 'You Focus {focus} ';
    if (generates.basicMana == 0 && generates.basicScrolls == 0) {
      output += this.pickOneRandomFrom(copy.focusFailureMessages);
    } else {
      output += `generating ${generates.basicMana} {basic mana} and ${generates.basicScrolls} {basic scrolls}.`;
    }
    return output;
  }

  createFinishEvent(ticks: number) {
    return new GameEvent(
      ticks,
      SystemMessageType.exposition,
      null,
      this.pickOneRandomFrom(copy.finishMessages)
    );
  }

  createRestartEvent() {
    return new GameEvent(
      0,
      SystemMessageType.exposition,
      null,
      this.pickOneRandomFrom(copy.initialMessages)
    );
  }

  pickOneRandomFrom(array: string[]): string {
    return array[Math.floor(Math.random() * array.length)];
  }
}
