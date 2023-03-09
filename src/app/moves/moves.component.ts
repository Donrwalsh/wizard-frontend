import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import * as timeSelectors from '../state/game/game.selector';
import * as moveSelectors from '../state/moves/moves.selector';
import { GameMove, initialFocus, Move } from "./moves.model";
import * as actions from '../state/moves/moves.actions';
import * as gameSelectors from '../state/game/game.selector';

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

    gameActive$ = this.store.select(gameSelectors.selectActive);
    gameActive: boolean = false;

    constructor(
        private store: Store,
    ) {
    }

    ngOnInit() {
        this.ticks$.subscribe(ticks => {
            this.ticks = ticks;
            let gameMoves = [this.focus].filter(gameMove => gameMove.cooldown.onCooldown === true && gameMove.cooldown.ticksFinish == this.ticks);
            gameMoves.forEach((gameMove) => this.store.dispatch(actions.takeMoveOffCooldown({ gameMove })));
        });

        this.gameActive$.subscribe(active => {
            this.gameActive = active;
        });

        this.focus$.subscribe(focus => {
            this.focus = new GameMove(focus);
        });
    }

    canUse(gameMove: GameMove): boolean {
        return this.gameActive &&
            !gameMove.cooldown.onCooldown &&
            gameMove.unlocked //will go away
    }

    useMove(event: GameMove) {
        if (this.canUse(event)) {
            this.store.dispatch(actions.useMove({ gameMove: event }));
        }
    }
}