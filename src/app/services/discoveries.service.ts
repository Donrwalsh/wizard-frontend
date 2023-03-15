import { Injectable } from '@angular/core';
import { DiscoveryData, DiscoveryTree } from '../discoveries/discoveries.model';

@Injectable({ providedIn: 'root' })
export class DiscoveriesService {
  constructor() {}

  discoveryData: DiscoveryData[] = [
    {
      name: 'Conjuration School',
      tree: DiscoveryTree.wizardry,
      cost: { basicScrolls: 1 },
      prereq: [],
    },
    {
      name: 'Enhanced Focus',
      tree: DiscoveryTree.wizardry,
      cost: { basicMana: 10 },
      prereq: ['Conjuration School'],
    },
  ];

  getEligibleDiscoveries(unlockedDiscoveries: string[]): DiscoveryData[] {
    return this.discoveryData.filter(
      (data) => !unlockedDiscoveries.includes(data.name)
    );
  }

  // getAffordableDiscoveries(unlockedDiscoveries: string[], resources: ResourceBundle) {
  //   this.getEligibleDiscoveries(unlockedDiscoveries).filter(...)
  // }

  // This step is interesting. I really want the resources from state to be in a resource bundle.
  // Then I can compare the available resources to the partial cost and decide if I have enough
  // to afford a given discovery. This can be done but I need to shift around some stuff on how
  // I store resources.

  // Also, this list of affordable/eligible discoveries probably needs to be known here for display
  // purposes, but it will also need to be known by the move component to decide if learn is usable.

  // This isn't a problem. The input is resource inventory > consult service + discovery state = list.
  // So this will be done outside of effects. Learning and then a discovery outcome belongs in effects.

  // I guess the idea here is I use this service to share common decision-making regarding discoveries
  // (as in both moves and discoveries need to be able to do these determinations). But none of these
  // operations result in modifying state, just interpreting the data held within it.
}
