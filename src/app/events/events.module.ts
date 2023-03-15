import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { eventsReducer } from '../state/events/events.reducer';
import { EventsComponent } from './events.component';

@NgModule({
  declarations: [EventsComponent],
  imports: [CommonModule, StoreModule.forFeature('events', eventsReducer)],
  exports: [EventsComponent],
})
export class EventsModule {}
