import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { MovesComponent } from './moves.component';

describe('MovesDisplayComponent', () => {
  let component: MovesComponent;
  let fixture: ComponentFixture<MovesComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [MovesComponent],
      providers: [
        provideMockStore({})
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
