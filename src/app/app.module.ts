import { isDevMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MovesModule } from './moves/moves.module';
import { ResourcesModule } from './resources/resources.module';
import { ROOT_REDUCERS } from './state/app.state';
import { metaReducers } from './state/meta.reducer';
import { MovesEffects } from './state/moves/moves.effects';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ResourcesModule,
    MovesModule,
    StoreModule.forRoot(ROOT_REDUCERS, { metaReducers }),
    EffectsModule.forRoot([MovesEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }