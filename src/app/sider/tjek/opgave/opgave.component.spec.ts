import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpgaveComponent } from './opgave.component';

describe('OpgaveComponent', () => {
  let component: OpgaveComponent;
  let fixture: ComponentFixture<OpgaveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpgaveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpgaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
