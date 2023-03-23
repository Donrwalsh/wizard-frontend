import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { skillsReducer } from '../state/skills/skills.reducer';
import { SkillNodeComponent } from './skill-node/skill-node.component';
import { SkillsComponent } from './skills.component';

@NgModule({
  declarations: [SkillsComponent, SkillNodeComponent],
  imports: [CommonModule, StoreModule.forFeature('skills', skillsReducer)],
  exports: [SkillsComponent, SkillNodeComponent],
})
export class DiscoveriesModule {}
