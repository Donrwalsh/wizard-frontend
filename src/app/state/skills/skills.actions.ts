import { createAction, props } from '@ngrx/store';
import { ResourceBundle } from 'src/app/resources/resources.model';
import { SkillTree } from 'src/app/skills/skills.model';

export const discover = createAction(
  '[Skills] Discover',
  props<{ discovery: string | null }>()
);

export const setVisibleSkillTree = createAction(
  '[Skills] Set Visible Tree',
  props<{ tree: SkillTree }>()
);
