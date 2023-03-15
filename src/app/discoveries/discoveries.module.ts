import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { discoveriesReducer } from '../state/discoveries/discoveries.reducer';
import { DiscoveriesComponent } from './discoveries.component';

@NgModule({
  declarations: [DiscoveriesComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature('discoveries', discoveriesReducer),
  ],
  exports: [DiscoveriesComponent],
})
export class DiscoveriesModule {}
