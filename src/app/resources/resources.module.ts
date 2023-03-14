import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { resourcesReducer } from '../state/resources/resources.reducer';
import { ResourceDisplayComponent } from './resource-display/resource-display.component';

@NgModule({
  declarations: [
    ResourceDisplayComponent
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature('resources', resourcesReducer),
  ],
  exports: [
    ResourceDisplayComponent
  ]
})
export class ResourcesModule { }
