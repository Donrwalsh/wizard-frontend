import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { ResourceBundle } from '../resources/resources.model';
import { SkillsService } from '../services/skills.service';
import { SkillsComponent } from './skills.component';
import { Skill, SkillData } from './skills.model';

let mockSkillData = [{} as SkillData];

class MockSkillsService {
  getUndiscoveredSkillsData(discoveredSkills: Skill[]) {
    return mockSkillData;
  }
  getDiscoveryEligibleSkillsData(
    discoveredSkills: Skill[],
    undiscoveredSkillsData: SkillData[]
  ) {
    return mockSkillData;
  }
  getAffordableSkills(
    discoveryEligibleSkills: SkillData[],
    resources: ResourceBundle
  ) {
    return mockSkillData;
  }
  canSomeSkillBeLearned(discoveredSkills: Skill[], resources: ResourceBundle) {
    return true;
  }
}

describe('SkillsComponent', () => {
  let component: SkillsComponent;
  let fixture: ComponentFixture<SkillsComponent>;
  let discoveriesService: SkillsService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [SkillsComponent],
      providers: [
        provideMockStore({}),
        { provide: SkillsService, useClass: MockSkillsService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SkillsComponent);
    component = fixture.componentInstance;
    discoveriesService = TestBed.inject(SkillsService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
