import { Injectable } from '@angular/core';
import { complete, ResourceBundle } from '../resources/resources.model';
import { Skill, SkillData, SkillTree } from '../skills/skills.model';
import * as icons from '../copy/icons';
import * as info from '../copy/info';

@Injectable({ providedIn: 'root' })
export class SkillsService {
  constructor() {}

  skillData: SkillData[] = [
    {
      name: 'Enhanced Focus',
      tree: SkillTree.wizardry,
      treePosition: 1,
      discoveryCost: { basicScrolls: 2 },
      unlockCost: { basicMana: 10 },
      prereq: ['Conjuration School'],
      image: icons.enhancedFocusSpell,
    },
    {
      name: 'Conjuration School',
      tree: SkillTree.wizardry,
      treePosition: 2,
      discoveryCost: { basicScrolls: 1 },
      unlockCost: { basicMana: 10 },
      prereq: [],
      image: icons.conjurationSchool,
    },
    {
      name: 'Enhanced Learn',
      tree: SkillTree.wizardry,
      treePosition: 3,
      discoveryCost: { basicScrolls: 5 },
      unlockCost: { basicMana: 50 },
      prereq: ['Conjuration School'],
      image: icons.enhancedLearnSpell,
    },
  ];

  getImageIfDiscovered(skill: Skill): string {
    let skillData = this.skillData.find(
      (skillData) => skillData.name == skill.name
    );
    return skillData && skill.discovered ? skillData.image : icons.unknownSkill;
  }

  getNameIfDiscovered(skill: Skill): string {
    return skill.discovered ? skill.name : 'Unknown Skill';
  }

  pickOneRandomFrom(array: string[]): string {
    return array[Math.floor(Math.random() * array.length)];
  }

  getTree(skill: Skill): string {
    return (
      this.skillData.find((skillData) => skillData.name == skill.name)?.tree ||
      'You should never see this'
    );
  }

  getInfoDescription(skill: Skill) {
    let output = 'This could be just about anything.';
    if (skill.discovered == true) {
      if (skill.name == 'Conjuration School') {
        output =
          'Unlocking this skill grants access to the Conjuration School of magic Skill Tree.';
      }
      if (skill.name == 'Enhanced Focus') {
        output =
          'Unlocking this skill adds the Enhanced Focus spell to your spellbook';
      }
    }
    return output;
  }

  getSkillDataByTree(tree: SkillTree): SkillData[] {
    return this.skillData.filter((skillData) => skillData.tree == tree);
  }

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
