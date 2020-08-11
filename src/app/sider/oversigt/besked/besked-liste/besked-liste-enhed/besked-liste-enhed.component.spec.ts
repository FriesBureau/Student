import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeskedListeEnhedComponent } from './besked-liste-enhed.component';

describe('BeskedListeEnhedComponent', () => {
  let component: BeskedListeEnhedComponent;
  let fixture: ComponentFixture<BeskedListeEnhedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeskedListeEnhedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeskedListeEnhedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
