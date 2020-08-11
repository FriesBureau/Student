import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssistentStartComponent } from './assistent-start.component';

describe('AssistentStartComponent', () => {
  let component: AssistentStartComponent;
  let fixture: ComponentFixture<AssistentStartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssistentStartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssistentStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
