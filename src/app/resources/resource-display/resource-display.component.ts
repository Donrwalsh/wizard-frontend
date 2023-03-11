import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as resourcesSelectors from '../../state/resources/resources.selector';
import * as resourcesActions from '../../state/resources/resources.actions';
import { ResourceType } from '../resources.model';
import * as timeSelectors from '../../state/game/game.selector';

@Component({
  selector: 'app-resource-display',
  templateUrl: './resource-display.component.html',
  styleUrls: ['./resource-display.component.sass']
})
export class ResourceDisplayComponent {

  basicMana$ = this.store.select(resourcesSelectors.selectBasicMana);
  basicMana!: number;

  basicScrolls$ = this.store.select(resourcesSelectors.selectBasicScrolls);
  basicScrolls!: number;

  constructor(
    private store: Store
  ) {
  }

  ngOnInit() {
    this.basicMana$.subscribe(mana => {
      this.basicMana = mana;
    });
    
    this.basicScrolls$.subscribe(basicScrolls => {
      this.basicScrolls = basicScrolls;
    });

  }

}
