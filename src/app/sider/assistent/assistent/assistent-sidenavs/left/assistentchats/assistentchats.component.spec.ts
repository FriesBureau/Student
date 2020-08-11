import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssistentSidenavComponent } from './assistentchats.component';

describe('AssistentSidenavComponent', () => {
  let component: AssistentSidenavComponent;
  let fixture: ComponentFixture<AssistentSidenavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssistentSidenavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssistentSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
