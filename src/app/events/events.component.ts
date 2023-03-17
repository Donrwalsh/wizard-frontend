import { Component, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import * as eventsSelectors from '../state/events/events.selector';
import { GameEvent } from './event.model';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class EventsComponent {
  eventLog$ = this.store.select(eventsSelectors.selectEventLog);
  eventLog!: GameEvent[];

  constructor(private store: Store) {}

  ngOnInit() {
    this.eventLog$.subscribe((eventLog) => {
      this.eventLog = eventLog;
      setTimeout(() => this.scrollEventLog(), 25);
    });
  }

  formatEvent(event: GameEvent) {
    return `${this.formatTime(event.when)}: ${this.parseEventDescription(
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
    return description
      .replace(
        '{focus}',
        "<img class='move-icon' src='/assets/moves/Focus.png' />"
      )
      .replace(
        '{learn}',
        "<img class='move-icon' src='/assets/moves/Learn.png' />"
      )
      .replace(
        '{basic mana}',
        "<img class='resource-icon' src='/assets/resources/Basic Mana.PNG' />"
      )
      .replace(
        '{basic scrolls}',
        "<img class='resource-icon' src='/assets/resources/Basic Scroll.png' />"
      );
  }

  scrollEventLog() {
    var objDiv = document.getElementById('event-log');
    objDiv!.scrollTop = objDiv!.scrollHeight;
  }
}
