import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { infoReducer } from '../state/info/info.reducer';
import { InfoComponent } from './info.component';

@NgModule({
  declarations: [InfoComponent],
  imports: [CommonModule, StoreModule.forFeature('info', infoReducer)],
  exports: [InfoComponent],
})
export class InfoModule {}
