import { ResourceAmount, ResourceType } from "../resources/resources.model"
import { GameEvent } from "../state/events/event.model";

export var notOnCooldown: MoveCooldown = {
    onCooldown: false,
    ticksStart: null,
    ticksFinish: null,
    animation: null
}

export enum MovesType {
    focus = "Focus",
    conjureGem = "Conjure Gem"
}

export interface Move {
    type: MovesType,
    unlocked: boolean,
    cooldown: MoveCooldown;
    // buffs: any[],
}

export var initialFocus: Move = {
    type: MovesType.focus,
    unlocked: true,
    cooldown: notOnCooldown,
}

export var initialConjureGem: Move = {
    type: MovesType.conjureGem,
    unlocked: false,
    cooldown: notOnCooldown,
}

export interface MoveCooldown {
    onCooldown: boolean;
    ticksStart: number | null;
    ticksFinish: number | null;
    animation: number | null;
}



export class GameMove {
    baseMove: Move;
    type: MovesType;
    unlocked: boolean;
    baseCooldown: number;
    baseGenerates: ResourceAmount;
    cooldown: MoveCooldown;
    

    constructor(move: Move) {
        this.baseMove = move;
        this.type = move.type;
        this.unlocked = move.unlocked;
        this.cooldown = move.cooldown;

        switch(move.type) { 
            case MovesType.focus: { 
                this.baseCooldown = 100;
                this.baseGenerates = { type: ResourceType.Mana, amount: 1 }
               break; 
            } 
            case MovesType.conjureGem: { 
                this.baseCooldown = 200;
                this.baseGenerates = { type: ResourceType.Gems, amount: 1 }
               break; 
            } 
            default: { 
                this.baseCooldown = 5000;
                //TODO: This needs a way to easily represent 'nothing'
                this.baseGenerates = { } as ResourceAmount; 
               break; 
            } 
         } 
    }

    calculateCooldown(): number {
        // Do calculation
        return this.baseCooldown;
    }

    calculateGenerates(): ResourceAmount {
        // Do calculation
        return this.baseGenerates;
    }

    calcGameEvent(ticks: number): GameEvent {
        return new GameEvent(ticks, this.baseMove);
    }

    calculateCooldownPercent(ticks: number): number {
        let percent = 0;
        if (this.cooldown.onCooldown === true) {
            let ticksDuration = this.cooldown.ticksFinish! - this.cooldown.ticksStart!;
            let ticksElapsed = ticks - this.cooldown.ticksStart!;
            let proportion = ticksElapsed / ticksDuration;
            percent = proportion * 100;
        }
        return percent;
    }
}