import { Component, ViewEncapsulation } from '@angular/core';
import * as discoveriesSelectors from '../state/discoveries/discoveries.selector';
import { Store } from '@ngrx/store';
import { DiscoveriesService } from '../services/discoveries.service';

@Component({
  selector: 'app-discoveries',
  templateUrl: './discoveries.component.html',
  styleUrls: ['./discoveries.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class DiscoveriesComponent {
  unlockedDiscoveries$ = this.store.select(
    discoveriesSelectors.selectUnlockedDiscoveries
  );
  unlockedDiscoveries!: string[];

  constructor(
    private store: Store,
    private discoveriesService: DiscoveriesService
  ) {}

  ngOnInit() {
    this.unlockedDiscoveries$.subscribe((unlockedDiscoveries) => {
      this.unlockedDiscoveries = unlockedDiscoveries;
    });
  }

  listOfEligibleDiscoveries() {
    return this.discoveriesService
      .getEligibleDiscoveries(this.unlockedDiscoveries)
      .map((data) => data.name);
  }
}
