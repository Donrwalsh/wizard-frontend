import { Component, ViewEncapsulation } from '@angular/core';
import * as skillsSelectors from '../state/skills/skills.selector';
import { Store } from '@ngrx/store';
import { SkillsService } from '../services/skills.service';
import { Skill, SkillData, SkillTree } from './skills.model';
import * as resourcesSelectors from '../state/resources/resources.selector';
import { ResourceBundle } from '../resources/resources.model';
import * as infoActions from '../state/info/info.actions';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class SkillsComponent {
  discoveredSkills$ = this.store.select(skillsSelectors.selectDiscoveredSkills);
  discoveredSkills: Skill[] = [];

  resources$ = this.store.select(resourcesSelectors.selectResources);
  resources!: ResourceBundle;

  visibleSkillTree$ = this.store.select(skillsSelectors.selectVisibleTree);
  visibleSkillTree!: SkillTree;

  visibleSkills!: SkillData[];

  nodeIndexArray = Array.from(Array(18), (x, i) => i + 1);

  constructor(private store: Store, protected skillsService: SkillsService) {}

  ngOnInit() {
    this.discoveredSkills$.subscribe((discoveredSkills) => {
      this.discoveredSkills = discoveredSkills;
    });

    this.resources$.subscribe((resources) => {
      this.resources = resources;
    });

    this.visibleSkillTree$.subscribe((skillTree) => {
      this.visibleSkillTree = skillTree;
      this.visibleSkills = this.skillsService.getSkillDataByTree(skillTree);
    });
  }

  skillDataByTreePosition(pos: number): SkillData | undefined {
    return this.visibleSkills.find((skill) => skill.treePosition == pos);
  }

  isSkillUnlockedByTreePosition(pos: number): boolean {
    let result = false;
    const skillData = this.skillDataByTreePosition(pos);
    if (skillData != undefined) {
      result =
        this.discoveredSkills.find(
          (discoveredSkill) => discoveredSkill.name == skillData.name
        )?.unlocked || false;
    }
    return result;
  }

  isSkillDiscoveredByTreePosition(pos: number): boolean {
    let result = false;
    const skillData = this.skillDataByTreePosition(pos);
    if (skillData != undefined) {
      result =
        this.discoveredSkills.find(
          (discoveredSkill) => discoveredSkill.name == skillData.name
        )?.discovered || false;
    }
    return result;
  }

  listOfUndiscoveredSkills() {
    return this.skillsService
      .getUndiscoveredSkillsData(this.discoveredSkills)
      .map((data) => data.name);
  }

  listOfEligibleToDiscoverSkills() {
    return this.skillsService
      .getDiscoveryEligibleSkillsData(
        this.discoveredSkills,
        this.skillsService.getUndiscoveredSkillsData(this.discoveredSkills)
      )
      .map((data) => data.name);
  }

  listOfDiscoverableAndAffordableSkills() {
    return this.skillsService
      .getAffordableSkills(
        this.skillsService.getDiscoveryEligibleSkillsData(
          this.discoveredSkills,
          this.skillsService.getUndiscoveredSkillsData(this.discoveredSkills)
        ),
        this.resources
      )
      .map((data) => data.name);
  }

  infoSelect(event: SkillData) {
    let skill = this.discoveredSkills.find(
      (discoveredSkill) => discoveredSkill.name == event.name
    );
    skill = skill || {
      name: event.name,
      discovered: false,
      unlocked: false,
    };
    this.store.dispatch(infoActions.showSkillInfo({ skill }));
  }
}
