import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { MovesComponent } from './moves.component';
import { GameMove } from './moves.model';

@Component({
  selector: 'app-move-button',
  template: '<p>Mock Move Button Component</p>'
})
class MockMoveButtonComponent {
  @Input() gameMove!: GameMove;
  @Input() ticks!: number;
  @Input() gameActive: boolean = false;
}

describe('MovesComponent', () => {
  let component: MovesComponent;
  let fixture: ComponentFixture<MovesComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [
        MovesComponent,
        MockMoveButtonComponent],
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
