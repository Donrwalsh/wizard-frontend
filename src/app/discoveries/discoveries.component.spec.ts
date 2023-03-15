import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { DiscoveriesService } from '../services/discoveries.service';
import { DiscoveriesComponent } from './discoveries.component';
import { DiscoveryData } from './discoveries.model';

let mockEligibleDiscoveries = [{} as DiscoveryData];

class MockDiscoveriesService {
  getEligibleDiscoveries(unlockedDiscoveries: string[]) {
    return mockEligibleDiscoveries;
  }
}

describe('DiscoveriesComponent', () => {
  let component: DiscoveriesComponent;
  let fixture: ComponentFixture<DiscoveriesComponent>;
  let discoveriesService: DiscoveriesService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [DiscoveriesComponent],
      providers: [
        provideMockStore({}),
        { provide: DiscoveriesService, useClass: MockDiscoveriesService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DiscoveriesComponent);
    component = fixture.componentInstance;
    discoveriesService = TestBed.inject(DiscoveriesService);
    fixture.detectChanges();
  });

  it('should create', () => {
    const spy = spyOn(
      discoveriesService,
      'getEligibleDiscoveries'
    ).and.callThrough();
    expect(component).toBeTruthy();
  });
});
