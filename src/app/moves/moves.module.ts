import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { movesReducer } from '../state/moves/moves.reducer';
import { MoveButtonComponent } from './move-button/move-button.component';
import { MovesComponent } from './moves.component';

@NgModule({
  declarations: [MovesComponent, MoveButtonComponent],
  imports: [CommonModule, StoreModule.forFeature('moves', movesReducer)],
  exports: [MovesComponent],
})
export class MovesModule {}
