import { ResourceAmount, ResourceType } from "../resources/resources.model"

export enum MovesType {
    focus = "Focus",
    conjureGem = "Conjure Gem"
}

export interface Move {
    //facts:
    type: MovesType,

    //state:
    unlocked: boolean,
    onCooldown: boolean,
    
    //stats:
    generates: ResourceAmount,
    cooldown: number,
}

export var initialFocus: Move = {
    type: MovesType.focus,
    unlocked: true,
    onCooldown: false,
    cooldown: 100,
    generates: { type: ResourceType.Mana, amount: 1 }
}

export var initialConjureGem: Move = {
    type: MovesType.conjureGem,
    unlocked: false,
    onCooldown: false,
    cooldown: 200,
    generates: { type: ResourceType.Gems, amount: 1 }
}