import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as timeActions from '../app/state/time/time.actions';
import * as timeSelectors from '../app/state/time/time.selector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'front';
  nemesis = 100;

  ticks$ = this.store.select(timeSelectors.selectTicks);

  ticks: number;

  constructor(
    private store: Store
  ) {
    this.ticks = 0;
  }

  reset() {
    this.store.dispatch(timeActions.resetTick());
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
