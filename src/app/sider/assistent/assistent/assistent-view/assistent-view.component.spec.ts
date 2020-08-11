import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssistentViewComponent } from './assistent-view.component';

describe('AssistentViewComponent', () => {
  let component: AssistentViewComponent;
  let fixture: ComponentFixture<AssistentViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssistentViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssistentViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
