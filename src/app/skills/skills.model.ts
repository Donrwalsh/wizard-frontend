import { ResourceBundle } from 'src/app/resources/resources.model';

export interface Skill {
  name: string;
  //   tree: SkillTree;
  //   cost: Partial<ResourceBundle>;
  //   prereq: string[];
  discovered: boolean;
  unlocked: boolean;
}

export enum SkillTree {
  wizardry = 'Wizardry',
}

export interface SkillData {
  name: string;
  tree: SkillTree;
  treePosition: number;
  discoveryCost: Partial<ResourceBundle>;
  unlockCost: Partial<ResourceBundle>;
  prereq: string[];
  image: string;
}

export enum DiscoveryType {
  basic = 'basic',
}
