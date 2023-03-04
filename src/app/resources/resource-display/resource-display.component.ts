import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as resourcesSelectors from '../../state/resources/resources.selector';
import * as resourcesActions from '../../state/resources/resources.actions';
import { ResourceType } from '../resources.model';
import * as timeSelectors from '../../state/time/time.selector';

@Component({
  selector: 'app-resource-display',
  templateUrl: './resource-display.component.html',
  styleUrls: ['./resource-display.component.sass']
})
export class ResourceDisplayComponent {

  ticks$ = this.store.select(timeSelectors.selectTicks);
  ticks: number;

  mana$ = this.store.select(resourcesSelectors.selectMana);
  mana: number;

  constructor(
    private store: Store
  ) {
    this.mana = 0;
    this.ticks = 0;
  }

  ngOnInit() {
    this.mana$.subscribe(mana => {
      this.mana = mana;
    });
    
    this.ticks$.subscribe(ticks => {
      this.ticks = ticks;
    });

  }

}
