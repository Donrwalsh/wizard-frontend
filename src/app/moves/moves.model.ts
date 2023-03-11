import { ResourceAmount, ResourceRange, ResourceType } from "../resources/resources.model"
import { GameEvent } from "../state/events/event.model";

export var notOnCooldown: MoveCooldown = {
    onCooldown: false,
    ticksStart: null,
    ticksFinish: null,
    animation: null
}

export enum MovesType {
    focus = "Focus",
    learn = "Learn",
    cast = "Cast",
    mission = "Mission"
}

export interface Move {
    type: MovesType,
    cooldown: MoveCooldown;
    // buffs: any[],
}

export var initialFocus: Move = {
    type: MovesType.focus,
    cooldown: notOnCooldown,
}

export var initialLearn: Move = {
    type: MovesType.learn,
    cooldown: notOnCooldown,
}

export var initialCast: Move = {
    type: MovesType.cast,
    cooldown: notOnCooldown,
}

export var initialMission: Move = {
    type: MovesType.mission,
    cooldown: notOnCooldown,
}

export interface MoveCooldown {
    onCooldown: boolean;
    ticksStart: number | null;
    ticksFinish: number | null;
    animation: number | null;
}

export type PossibleOutcome = ResourceAmount | ResourceRange; // expands to cover all possible results of move usage.

export class GameMove {
    baseMove: Move;
    type: MovesType;
    baseCooldown: number;

    baseOutcomes: PossibleOutcome[];


    // baseGenerates: ResourceAmount; // This is locked into the OG focus plan.
    //how to represent the different outcomes?

    cooldown: MoveCooldown;
    

    constructor(move: Move) {
        this.baseMove = move;
        this.type = move.type;
        this.cooldown = move.cooldown;

        switch(move.type) { 
            case MovesType.focus: { 
                this.baseCooldown = 100;
                this.baseOutcomes = [
                    { type: ResourceType.basicMana, lowAmount: 0, highAmount: 3 },
                    { type: ResourceType.basicScroll, lowAmount: 0, highAmount: 1 },
                ]
               break; 
            } 
            case MovesType.learn: { 
                this.baseCooldown = 300;
                this.baseOutcomes = [
                    { type: ResourceType.basicMana, amount: 5 },
                    { type: ResourceType.basicScroll, amount: 1 }
                ]
               break; 
            }
            case MovesType.cast: { 
                this.baseCooldown = 1000;
                this.baseOutcomes = []
               break; 
            }
            case MovesType.mission: { 
                this.baseCooldown = 5000;
                this.baseOutcomes = []
               break; 
            } 
            default: { 
                this.baseCooldown = 5000;
                this.baseOutcomes = []
               break; 
            } 
         } 
    }

    calculateCooldown(): number {
        // Do calculation
        return this.baseCooldown;
    }

    calcOutcomes(): PossibleOutcome[] {
        // Do calculation
        return this.baseOutcomes;
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