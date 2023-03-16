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
  discoveryCost: Partial<ResourceBundle>;
  unlockCost: Partial<ResourceBundle>;
  prereq: string[];
}

export enum DiscoveryType {
  basic = 'basic',
}
