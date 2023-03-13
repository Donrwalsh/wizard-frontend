import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as movesActions from '../app/state/moves/moves.actions';
import * as gameActions from './state/game/game.actions';
import * as eventsActions from '../app/state/events/events.actions';
import * as resourcesActions from '../app/state/resources/resources.actions';
import * as gameSelectors from './state/game/game.selector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'front';

  ticks$ = this.store.select(gameSelectors.selectTicks);
  ticks!: number;

  nemesis$ = this.store.select(gameSelectors.selectNemesis);
  nemesis!: number;

  gameActive$ = this.store.select(gameSelectors.selectActive);
  gameActive: boolean = false;

  constructor(
    private store: Store
  ) {}

  restart() {
    //Expand to handle all behaviors with a single action dispatch
    this.store.dispatch(gameActions.restart())

    this.store.dispatch(movesActions.resetAllMoves());
  }

  get nemesisAttackTimer() {
    let minutes = Math.floor(this.nemesis / 600 - this.ticks / 600);
    let seconds = 60 - Math.floor((this.ticks % 600)/10)
    return `${minutes}:${seconds == 60 ? "00" : seconds}` ;
  }

  ngOnInit() {
    this.ticks$.subscribe(ticks => {
      this.ticks = ticks;
      if (ticks >= this.nemesis) {
        this.store.dispatch(gameActions.finish());
      }
    });

    this.nemesis$.subscribe(nemesis => {
      this.nemesis = nemesis;
    })

    this.gameActive$.subscribe(active => {
      this.gameActive = active;
    });

    setInterval(() => {
      if (this.gameActive) {
        this.store.dispatch(gameActions.tick());
      }
    }, 100);

  }
}
