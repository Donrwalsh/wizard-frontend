import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Move, MovesType } from '../moves/moves.model';
import { MovesService } from '../services/moves.service';
import { SkillsService } from '../services/skills.service';
import { Skill } from '../skills/skills.model';
import * as infoSelectors from '../state/info/info.selector';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.sass'],
})
export class InfoComponent {
  selected$ = this.store.select(infoSelectors.selectSelected);
  selected!: Move | Skill | null;

  typeSelected$ = this.store.select(infoSelectors.selectTypeSelected);
  typeSelected!: string;

  constructor(
    private store: Store,
    protected movesService: MovesService,
    protected skillsService: SkillsService
  ) {}

  ngOnInit() {
    this.selected$.subscribe((selected) => {
      this.selected = selected;
    });

    this.typeSelected$.subscribe((typeSelected) => {
      this.typeSelected = typeSelected;
    });
  }

  selectedAsMove() {
    return this.selected as Move;
  }

  selectedAsSkill() {
    return this.selected as Skill;
  }
}
