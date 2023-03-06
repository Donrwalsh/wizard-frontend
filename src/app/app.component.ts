import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as movesActions from '../app/state/moves/moves.actions';
import * as timeActions from '../app/state/time/time.actions';
import * as eventsActions from '../app/state/events/events.actions';
import * as resourcesActions from '../app/state/resources/resources.actions';
import * as timeSelectors from '../app/state/time/time.selector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'front';

  ticks$ = this.store.select(timeSelectors.selectTicks);
  ticks: number;

  nemesis$ = this.store.select(timeSelectors.selectNemesis);
  nemesis: number;

  constructor(
    private store: Store
  ) {
    this.ticks = 0;
    this.nemesis = 3000;
  }

  reset() {
    // dispatch a single 'reset' action here.
    this.store.dispatch(timeActions.resetTick());
    this.store.dispatch(resourcesActions.resetMana());
    this.store.dispatch(movesActions.resetAllMoves());
    this.store.dispatch(eventsActions.clearEventsLog());
  }

  get nemesisAttackTimer() {
    let minutes = Math.floor(this.nemesis / 600 - this.ticks / 600);
    let seconds = 60 - Math.floor((this.ticks % 600)/10)
    return `${minutes}:${seconds == 60 ? "00" : seconds}` ;
  }

  ngOnInit() {
    this.ticks$.subscribe(ticks => {
      this.ticks = ticks;
    });

    setInterval(() => {
      if (this.ticks < this.nemesis) {
        this.store.dispatch(timeActions.tick());
      }
    }, 100);

  }
}
