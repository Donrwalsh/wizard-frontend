import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ResourceBundle } from 'src/app/resources/resources.model';
import { MovesService } from 'src/app/services/moves.service';
import { Skill } from 'src/app/skills/skills.model';
import { Move, MovesType } from '../moves.model';

@Component({
  selector: 'app-move-button',
  templateUrl: './move-button.component.html',
  styleUrls: ['./move-button.component.sass'],
})
export class MoveButtonComponent {
  @Input() move!: Move;
  @Input() ticks!: number;
  @Input() gameActive: boolean = false;
  @Input() discoveredSkills!: Skill[]; // this seems excessive
  @Input() resources!: ResourceBundle;

  @Output() moveButtonClick = new EventEmitter<Move>();
  @Output() moveButtonHover = new EventEmitter<Move>();

  clickMove() {
    if (this.move.type == MovesType.focus) {
      this.moveButtonClick.emit(this.move);
    } else if (this.move.type == MovesType.learn) {
      if (
        this.movesService.canAnythingBeLearned(
          this.discoveredSkills,
          this.resources
        )
      ) {
        this.moveButtonClick.emit(this.move);
      }
    }
  }

  onMouseEnter() {
    this.moveButtonHover.emit(this.move);
  }

  constructor(protected movesService: MovesService) {}
}
