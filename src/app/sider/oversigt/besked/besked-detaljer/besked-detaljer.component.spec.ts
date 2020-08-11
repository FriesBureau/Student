import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeskedDetaljerComponent } from './besked-detaljer.component';

describe('BeskedDetaljerComponent', () => {
  let component: BeskedDetaljerComponent;
  let fixture: ComponentFixture<BeskedDetaljerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeskedDetaljerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeskedDetaljerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
