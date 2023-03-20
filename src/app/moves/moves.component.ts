import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { MovesService } from '../services/moves.service';
import * as gameSelectors from '../state/game/game.selector';
import * as skillsSelectors from '../state/skills/skills.selector';
import * as timeSelectors from '../state/game/game.selector';
import * as actions from '../state/moves/moves.actions';
import * as infoActions from '../state/info/info.actions';
import * as moveSelectors from '../state/moves/moves.selector';
import * as resourcesSelectors from '../state/resources/resources.selector';
import { Move } from './moves.model';
import { Skill } from '../skills/skills.model';
import { ResourceBundle } from '../resources/resources.model';

@Component({
  selector: 'app-moves',
  templateUrl: './moves.component.html',
  styleUrls: ['./moves.component.sass'],
})
export class MovesComponent {
  ticks$ = this.store.select(timeSelectors.selectTicks);
  ticks: number = 0;

  focus$ = this.store.select(moveSelectors.selectFocus);
  focus!: Move;

  learn$ = this.store.select(moveSelectors.selectLearn);
  learn!: Move;

  cast$ = this.store.select(moveSelectors.selectCast);
  cast!: Move;

  mission$ = this.store.select(moveSelectors.selectMission);
  mission!: Move;

  gameActive$ = this.store.select(gameSelectors.selectActive);
  gameActive: boolean = false;

  discoveredSkills$ = this.store.select(skillsSelectors.selectDiscoveredSkills);
  discoveredSkills!: Skill[];

  resources$ = this.store.select(resourcesSelectors.selectResources);
  resources!: ResourceBundle;

  constructor(private store: Store) {}

  ngOnInit() {
    this.ticks$.subscribe((ticks) => {
      this.ticks = ticks;
      let movesComingOffCooldown = [
        this.focus,
        this.learn,
        this.cast,
        this.mission,
      ].filter(
        (move) =>
          move?.cooldown.onCooldown === true &&
          move.cooldown.ticksFinish == this.ticks
      );
      movesComingOffCooldown.forEach((move) =>
        this.store.dispatch(actions.takeMoveOffCooldown({ move }))
      );
    });

    this.gameActive$.subscribe((active) => {
      this.gameActive = active;
    });

    this.focus$.subscribe((focus) => {
      this.focus = focus;
    });

    this.learn$.subscribe((learn) => {
      this.learn = learn;
    });

    this.cast$.subscribe((cast) => {
      this.cast = cast;
    });

    this.mission$.subscribe((mission) => {
      this.mission = mission;
    });

    this.discoveredSkills$.subscribe((discoveredSkills) => {
      this.discoveredSkills = discoveredSkills;
    });

    this.resources$.subscribe((resources) => {
      this.resources = resources;
    });
  }

  canUse(move: Move): boolean {
    return this.gameActive && !move.cooldown.onCooldown;
  }

  useMove(event: Move) {
    if (this.canUse(event)) {
      this.store.dispatch(actions.playerClickedMove({ move: event }));
    }
  }

  infoSelect(event: Move) {
    this.store.dispatch(infoActions.showMoveInfo({ move: event }));
  }
}
