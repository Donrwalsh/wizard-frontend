import { createAction, props } from '@ngrx/store';
import { Move } from 'src/app/moves/moves.model';
import { Skill } from 'src/app/skills/skills.model';

export const showMoveInfo = createAction(
  '[Info] Show Move',
  props<{ move: Move }>()
);

export const showSkillInfo = createAction(
  '[Info] Show Skill',
  props<{ skill: Skill }>()
);
