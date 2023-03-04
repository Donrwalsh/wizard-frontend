import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { MovesDisplayComponent } from './moves-display.component';

describe('MovesDisplayComponent', () => {
  let component: MovesDisplayComponent;
  let fixture: ComponentFixture<MovesDisplayComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [MovesDisplayComponent],
      providers: [
        provideMockStore({})
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovesDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
