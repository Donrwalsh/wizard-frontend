import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import * as timeSelectors from '../state/time/time.selector';
import * as moveSelectors from '../state/moves/moves.selector';
import { GameMove, initialFocus, Move } from "./moves.model";
import * as actions from '../state/moves/moves.actions';

@Component({
    selector: 'app-moves',
    templateUrl: './moves.component.html',
    styleUrls: ['./moves.component.sass']
})
export class MovesComponent {
    ticks$ = this.store.select(timeSelectors.selectTicks);
    ticks: number = 0;

    focus$ = this.store.select(moveSelectors.selectFocus);
    focus: GameMove = new GameMove(initialFocus);

    constructor(
        private store: Store,
    ) {
    }

    ngOnInit() {
        this.ticks$.subscribe(ticks => {
            this.ticks = ticks;
            let gameMoves = [this.focus].filter(gameMove => gameMove.onCooldown === true && gameMove.readyAt == this.ticks);
            gameMoves.forEach((gameMove) => this.store.dispatch(actions.takeMoveOffCooldown({ gameMove })));
        });

        this.focus$.subscribe(focus => {
            this.focus = new GameMove(focus);
        });
    }

    canUse(gameMove: GameMove): boolean {
        return !gameMove.onCooldown && gameMove.unlocked;
    }

    useMove(event: GameMove) {
        if (!event.onCooldown && event.unlocked && this.ticks < 3000) //replace with proper store call
        this.store.dispatch(actions.useMove({ gameMove: event }));
    }
}