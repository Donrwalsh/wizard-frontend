import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GameMove } from '../moves.model';

@Component({
  selector: 'app-move-button',
  templateUrl: './move-button.component.html',
  styleUrls: ['./move-button.component.sass']
})
export class MoveButtonComponent {
  @Input() gameMove!: GameMove;
  @Input() ticks!: number;

  @Output() moveButtonEvent = new EventEmitter<GameMove>();

  clickMove() {
    this.moveButtonEvent.emit(this.gameMove)
  }

}
