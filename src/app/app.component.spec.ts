import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { AppComponent } from './app.component';

@Component({
  selector: 'app-skills',
  template: '<p>Mock Skills Component</p>',
})
class MockSkillsComponent {}

@Component({
  selector: 'app-info',
  template: '<p>Mock Info Component</p>',
})
class MockInfoComponent {}

@Component({
  selector: 'app-events',
  template: '<p>Mock Events Component</p>',
})
class MockEventsComponent {}

@Component({
  selector: 'app-moves',
  template: '<p>Mock Moves Component</p>',
})
class MockMovesComponent {}

@Component({
  selector: 'app-resource-display',
  template: '<p>Mock Resource Display Component</p>',
})
class MockResourceDisplayComponent {}

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [
        AppComponent,
        MockEventsComponent,
        MockInfoComponent,
        MockMovesComponent,
        MockResourceDisplayComponent,
        MockSkillsComponent,
      ],
      providers: [provideMockStore({})],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'front'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('front');
  });

  // it('should render title', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('.content span')?.textContent).toContain('front app is running!');
  // });
});
