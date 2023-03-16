import { Injectable } from '@angular/core';
import { complete, ResourceBundle } from '../resources/resources.model';
import { Skill, SkillData, SkillTree } from '../skills/skills.model';

@Injectable({ providedIn: 'root' })
export class SkillsService {
  constructor() {}

  skillData: SkillData[] = [
    {
      name: 'Conjuration School',
      tree: SkillTree.wizardry,
      discoveryCost: { basicScrolls: 1 },
      unlockCost: { basicMana: 10 },
      prereq: [],
    },
    {
      name: 'Enhanced Focus',
      tree: SkillTree.wizardry,
      discoveryCost: { basicScrolls: 2 },
      unlockCost: { basicMana: 10 },
      prereq: ['Conjuration School'],
    },
  ];

  getUndiscoveredSkillsData(discoveredSkills: Skill[]): SkillData[] {
    return discoveredSkills.length > 0
      ? this.skillData.filter(
          (data) =>
            !discoveredSkills.map((data) => data.name).includes(data.name)
        )
      : this.skillData;
  }

  // undiscovered and prereqs known.
  getDiscoveryEligibleSkillsData(
    discoveredSkills: Skill[],
    undiscoveredSkillsData: SkillData[]
  ): SkillData[] {
    let namesOfDiscoveredSkills = discoveredSkills.map((data) => data.name);
    return undiscoveredSkillsData.filter(
      (undiscoveredSkill) =>
        undiscoveredSkill.prereq.length == 0 ||
        undiscoveredSkill.prereq.every((prereq) =>
          namesOfDiscoveredSkills.includes(prereq)
        )
    );
    return [];
  }

  getAffordableSkills(
    discoveryEligibleSkills: SkillData[],
    resources: ResourceBundle
  ): SkillData[] {
    return discoveryEligibleSkills.filter((skillData) => {
      let completeDiscoveryCost = complete(skillData.discoveryCost);
      return (
        // This isn't scalable, but it's quick and dirty for now.
        completeDiscoveryCost.basicMana <= resources.basicMana &&
        completeDiscoveryCost.basicScrolls <= resources.basicScrolls
      );
    });
  }

  canSomeSkillBeLearned(discoveredSkills: Skill[], resources: ResourceBundle) {
    let undiscoveredSkills = this.getUndiscoveredSkillsData(discoveredSkills);
    let eligibleSkills = this.getDiscoveryEligibleSkillsData(
      discoveredSkills,
      undiscoveredSkills
    );
    let learnableSkills = this.getAffordableSkills(eligibleSkills, resources);
    return learnableSkills.length > 0;
  }

  // This service should make available all the necessary logic to decide if any skill is
  // eligible to learn (a requirement for using the learn ability) and which skills to select
  // from upon a discovery event.
}
