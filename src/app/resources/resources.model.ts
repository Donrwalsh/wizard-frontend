export interface ResourceAmount {
  type: ResourceType;
  amount: number;
}

export interface ResourceBundle {
  basicMana: number;
  basicScrolls: number;
}

export interface ResourceRange {
  type: ResourceType;
  lowAmount: number;
  highAmount: number;
}

export enum ResourceType {
  basicMana = 'Basic Mana',
  basicScrolls = 'Basic Scrolls',
}

export function complete(obj: Partial<ResourceBundle>) : ResourceBundle {
  return Object.assign({
    basicMana: 0,
    basicScrolls: 0
  }, obj);
}
