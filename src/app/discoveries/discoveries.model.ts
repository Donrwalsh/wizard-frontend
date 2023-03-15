import { ResourceBundle } from 'src/app/resources/resources.model';

export interface Discovery {
  name: string;
  //   tree: DiscoveryTree;
  //   cost: Partial<ResourceBundle>;
  //   prereq: string[];
  discovered: boolean;
  unlocked: boolean;
}

export enum DiscoveryTree {
  wizardry = 'Wizardry',
}

export interface DiscoveryData {
  name: string;
  tree: DiscoveryTree;
  cost: Partial<ResourceBundle>;
  prereq: string[];
}
