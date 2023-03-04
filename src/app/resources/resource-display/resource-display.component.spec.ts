import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceDisplayComponent } from './resource-display.component';

describe('ResourceDisplayComponent', () => {
  let component: ResourceDisplayComponent;
  let fixture: ComponentFixture<ResourceDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResourceDisplayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResourceDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
