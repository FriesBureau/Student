import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpgaveListeItemComponent } from './opgave-liste-item.component';

describe('OpgaveListeItemComponent', () => {
  let component: OpgaveListeItemComponent;
  let fixture: ComponentFixture<OpgaveListeItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpgaveListeItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpgaveListeItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
