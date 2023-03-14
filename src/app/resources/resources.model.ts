export interface ResourceAmount {
    type: ResourceType,
    amount: number
}

export interface ResourceBundle {
    basicMana: number,
    basicScrolls: number
}

export interface ResourceRange {
    type: ResourceType,
    lowAmount: number,
    highAmount: number
}

export enum ResourceType {
    basicMana = "Basic Mana",
    basicScroll = "Basic Scroll"
}