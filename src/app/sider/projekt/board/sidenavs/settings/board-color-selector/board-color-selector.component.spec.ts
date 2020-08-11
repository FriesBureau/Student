import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardColorSelectorComponent } from './board-color-selector.component';

describe('BoardColorSelectorComponent', () => {
  let component: BoardColorSelectorComponent;
  let fixture: ComponentFixture<BoardColorSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoardColorSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardColorSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
