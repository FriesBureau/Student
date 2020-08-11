import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpgaveListeComponent } from './opgave-liste.component';

describe('OpgaveListeComponent', () => {
  let component: OpgaveListeComponent;
  let fixture: ComponentFixture<OpgaveListeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpgaveListeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpgaveListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
