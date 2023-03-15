import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MovesService } from 'src/app/services/moves.service';
import { Move } from '../moves.model';

@Component({
  selector: 'app-move-button',
  templateUrl: './move-button.component.html',
  styleUrls: ['./move-button.component.sass'],
})
export class MoveButtonComponent {
  @Input() move!: Move;
  @Input() ticks!: number;
  @Input() gameActive: boolean = false;

  @Output() moveButtonEvent = new EventEmitter<Move>();

  clickMove() {
    this.moveButtonEvent.emit(this.move);
  }

  constructor(protected movesService: MovesService) {}
}
