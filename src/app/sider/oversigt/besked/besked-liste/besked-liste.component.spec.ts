import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeskedListeComponent } from './besked-liste.component';

describe('BeskedListeComponent', () => {
  let component: BeskedListeComponent;
  let fixture: ComponentFixture<BeskedListeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeskedListeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeskedListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
