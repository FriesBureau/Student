import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpgaveDetaljerComponent } from './opgave-detaljer.component';

describe('OpgaveDetaljerComponent', () => {
  let component: OpgaveDetaljerComponent;
  let fixture: ComponentFixture<OpgaveDetaljerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpgaveDetaljerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpgaveDetaljerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
