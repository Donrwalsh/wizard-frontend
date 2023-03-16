import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { skillsReducer } from '../state/skills/skills.reducer';
import { SkillsComponent } from './skills.component';

@NgModule({
  declarations: [SkillsComponent],
  imports: [CommonModule, StoreModule.forFeature('skills', skillsReducer)],
  exports: [SkillsComponent],
})
export class DiscoveriesModule {}
