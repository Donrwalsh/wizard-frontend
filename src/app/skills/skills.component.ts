import { Component, ViewEncapsulation } from '@angular/core';
import * as skillsSelectors from '../state/skills/skills.selector';
import { Store } from '@ngrx/store';
import { SkillsService } from '../services/skills.service';
import { Skill } from './skills.model';
import * as resourcesSelectors from '../state/resources/resources.selector';
import { ResourceBundle } from '../resources/resources.model';

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

  constructor(private store: Store, private skillsService: SkillsService) {}

  ngOnInit() {
    this.discoveredSkills$.subscribe((discoveredSkills) => {
      this.discoveredSkills = discoveredSkills;
    });

    this.resources$.subscribe((resources) => {
      this.resources = resources;
    });
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
}
