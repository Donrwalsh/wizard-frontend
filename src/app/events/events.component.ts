import { Component, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { MovesService } from '../services/moves.service';
import * as eventsSelectors from '../state/events/events.selector';
import { GameEvent } from './event.model';
import * as icons from '../copy/icons';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class EventsComponent {
  eventLog$ = this.store.select(eventsSelectors.selectEventLog);
  eventLog!: GameEvent[];

  constructor(private store: Store, private movesService: MovesService) {}

  ngOnInit() {
    this.eventLog$.subscribe((eventLog) => {
      this.eventLog = eventLog;
      setTimeout(() => this.scrollEventLog(), 25);
    });
  }

  formatEvent(event: GameEvent) {
    return `${this.formatTime(event.when)}: ${icons.parseText(
      event.description
    )}`;
  }

  formatTime(ticks: number) {
    let minutesTens = '0';
    let minutesOnes = Math.floor(ticks / 600);
    let secondsTens = Math.floor(ticks / 100) % 6;
    let secondsOnes = Math.floor(ticks / 10) % 10;
    return `[${minutesTens}${minutesOnes}:${secondsTens}${secondsOnes}]: `;
  }

  parseEventDescription(description: string) {
    return icons.parseText(description);
  }

  scrollEventLog() {
    var objDiv = document.getElementById('event-log');
    objDiv!.scrollTop = objDiv!.scrollHeight;
  }
}
