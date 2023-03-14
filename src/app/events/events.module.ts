import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { movesReducer } from '../state/moves/moves.reducer';
import { EventsComponent } from './events.component';

@NgModule({
  declarations: [
    EventsComponent,
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature('moves', movesReducer),
  ],
  exports: [
    EventsComponent,
  ]
})
export class EventsModule { }
