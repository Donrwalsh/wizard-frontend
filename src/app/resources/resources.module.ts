import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResourceDisplayComponent } from './resource-display/resource-display.component';
import { StoreModule } from '@ngrx/store';
import { resourcesReducer } from '../state/resources/resources.reducer';
import { ROOT_REDUCERS } from '../state/app.state';
import { metaReducers } from '../state/meta.reducer';



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
