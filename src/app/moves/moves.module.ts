import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { movesReducer } from '../state/moves/moves.reducer';
import { MovesDisplayComponent } from './moves-display/moves-display.component';


@NgModule({
  declarations: [
    MovesDisplayComponent
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature('moves', movesReducer),
  ],
  exports: [
    MovesDisplayComponent
  ]
})
export class MovesModule { }
