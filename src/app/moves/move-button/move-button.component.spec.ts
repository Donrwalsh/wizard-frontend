import { ComponentFixture, TestBed } from '@angular/core/testing';
import { initialState } from 'src/app/state/moves/moves.reducer';
import { MoveButtonComponent } from './move-button.component';

describe('MoveButtonComponent', () => {
  let component: MoveButtonComponent;
  let fixture: ComponentFixture<MoveButtonComponent>;

  let defaultTicks: number = 50;
  let defaultGameActive: boolean = false;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MoveButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MoveButtonComponent);
    component = fixture.componentInstance;

    component.move = initialState.focus;
    component.ticks = defaultTicks;
    component.gameActive = defaultGameActive;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
