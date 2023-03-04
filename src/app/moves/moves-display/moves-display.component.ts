import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { initialConjureGem, initialFocus, Move } from '../moves.model';
import * as moveSelectors from '../../state/moves/moves.selector';
import * as actions from '../../state/moves/moves.actions';

@Component({
  selector: 'app-moves-display',
  templateUrl: './moves-display.component.html',
  styleUrls: ['./moves-display.component.sass']
})
export class MovesDisplayComponent {

  focus$ = this.store.select(moveSelectors.selectFocus);
  focus: Move = initialFocus;

  conjureGem$ = this.store.select(moveSelectors.selectConjureGem);
  conjureGem: Move = initialConjureGem;


  constructor(
    private store: Store
  ) { }

  canUse(move: Move): boolean { 
    return !move.onCooldown && move.unlocked;
  }

  useMove(move: Move) {
    this.store.dispatch(actions.useMove({move}));
  }

  ngOnInit() {
    this.focus$.subscribe(focus => {
      this.focus = focus;
    });

    this.conjureGem$.subscribe(conjureGem => {
      this.conjureGem = conjureGem;
    });

  

  }
    
  
}
