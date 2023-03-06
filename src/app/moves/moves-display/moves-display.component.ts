import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { GameMove, initialConjureGem, initialFocus, Move } from '../moves.model';
import * as moveSelectors from '../../state/moves/moves.selector';
import * as timeSelectors from '../../state/time/time.selector';
import * as actions from '../../state/moves/moves.actions';

@Component({
  selector: 'app-moves-display',
  templateUrl: './moves-display.component.html',
  styleUrls: ['./moves-display.component.sass']
})
export class MovesDisplayComponent {

  ticks$ = this.store.select(timeSelectors.selectTicks);
  ticks: number;

  focus$ = this.store.select(moveSelectors.selectFocus);
  focus: Move = initialFocus;
  focusGameMove: GameMove;
  

  conjureGem$ = this.store.select(moveSelectors.selectConjureGem);
  conjureGem: Move = initialConjureGem;
  conjureGemGameMove: GameMove;


  constructor(
    private store: Store,
  ) { 
    this.focusGameMove = new GameMove(this.focus);
    this.conjureGemGameMove = new GameMove(this.conjureGem);
    this.ticks = 0;
  }

  canUse(gameMove: GameMove): boolean { 
    return !gameMove.onCooldown && gameMove.unlocked;
  }

  useMove(gameMove: GameMove) {
    //TODO: Needs if game is active check relying on store info
    this.store.dispatch(actions.useMove({gameMove}));
  }

  ngOnInit() {
    this.ticks$.subscribe(ticks => {
      this.ticks = ticks;
      let gameMoves = [this.focusGameMove].filter(gameMove => gameMove.onCooldown === true && gameMove.readyAt == this.ticks);
      gameMoves.forEach((gameMove) => this.store.dispatch(actions.takeMoveOffCooldown({gameMove})));
    });

    this.focus$.subscribe(focus => {
      this.focus = focus;
      this.focusGameMove = new GameMove(this.focus);
    });

    this.conjureGem$.subscribe(conjureGem => {
      this.conjureGem = conjureGem;
    });

  }
}
