import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import * as gameSelectors from '../state/game/game.selector';
import * as timeSelectors from '../state/game/game.selector';
import * as actions from '../state/moves/moves.actions';
import * as moveSelectors from '../state/moves/moves.selector';
import { GameMove } from "./moves.model";

@Component({
    selector: 'app-moves',
    templateUrl: './moves.component.html',
    styleUrls: ['./moves.component.sass']
})
export class MovesComponent {
    ticks$ = this.store.select(timeSelectors.selectTicks);
    ticks: number = 0;

    focus$ = this.store.select(moveSelectors.selectFocus);
    focus!: GameMove;

    learn$ = this.store.select(moveSelectors.selectLearn);
    learn!: GameMove;

    cast$ = this.store.select(moveSelectors.selectCast);
    cast!: GameMove;

    mission$ = this.store.select(moveSelectors.selectMission);
    mission!: GameMove;

    gameActive$ = this.store.select(gameSelectors.selectActive);
    gameActive: boolean = false;

    constructor(
        private store: Store,
    ) {
    }

    ngOnInit() {
        this.ticks$.subscribe(ticks => {
            this.ticks = ticks;
            let gameMoves = [this.focus, this.learn, this.cast, this.mission].filter(gameMove => gameMove?.cooldown.onCooldown === true && gameMove.cooldown.ticksFinish == this.ticks);
            gameMoves.forEach((gameMove) => this.store.dispatch(actions.takeMoveOffCooldown({ gameMove })));
        });

        this.gameActive$.subscribe(active => {
            this.gameActive = active;
        });

        this.focus$.subscribe(focus => {
            this.focus = new GameMove(focus);
        });

        this.learn$.subscribe(learn => {
            this.learn = new GameMove(learn);
        });

        this.cast$.subscribe(cast => {
            this.cast = new GameMove(cast);
        });

        this.mission$.subscribe(mission => {
            this.mission = new GameMove(mission);
        });
    }

    canUse(gameMove: GameMove): boolean {
        return this.gameActive && !gameMove.cooldown.onCooldown;
    }

    useMove(event: GameMove) {
        if (this.canUse(event)) {
            this.store.dispatch(actions.prepMove({ gameMove: event }));
        }
    }
}