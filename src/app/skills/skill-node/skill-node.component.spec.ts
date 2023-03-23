import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { SkillNodeComponent } from './skill-node.component';

describe('SkillNodeComponent', () => {
  let component: SkillNodeComponent;
  let fixture: ComponentFixture<SkillNodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SkillNodeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SkillNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
