import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameOfTheMonthComponent } from './game-of-the-month.component';

describe('GameOfTheMonthComponent', () => {
  let component: GameOfTheMonthComponent;
  let fixture: ComponentFixture<GameOfTheMonthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameOfTheMonthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameOfTheMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
