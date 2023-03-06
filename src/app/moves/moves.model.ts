import { ResourceAmount, ResourceType } from "../resources/resources.model"
import { GameEvent } from "../state/events/event.model";

export enum MovesType {
    focus = "Focus",
    conjureGem = "Conjure Gem"
}

export interface Move {
    type: MovesType,
    unlocked: boolean,
    onCooldown: boolean,
    readyAt: number | null
    // buffs: any[],
}

export var initialFocus: Move = {
    type: MovesType.focus,
    unlocked: true,
    onCooldown: false,
    readyAt: null
}

export var initialConjureGem: Move = {
    type: MovesType.conjureGem,
    unlocked: false,
    onCooldown: false,
    readyAt: null
}

export class GameMove {
    baseMove: Move;
    type: MovesType;
    unlocked: boolean;
    baseCooldown: number;
    baseGenerates: ResourceAmount;
    onCooldown: boolean;
    readyAt: number | null;
    

    constructor(move: Move) {
        this.baseMove = move;
        this.type = move.type;
        this.unlocked = move.unlocked;
        this.onCooldown = move.onCooldown;
        this.readyAt = move.readyAt;

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
}