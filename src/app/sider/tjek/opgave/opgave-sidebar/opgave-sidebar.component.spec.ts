import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpgaveSidebarComponent } from './opgave-sidebar.component';

describe('OpgaveSidebarComponent', () => {
  let component: OpgaveSidebarComponent;
  let fixture: ComponentFixture<OpgaveSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpgaveSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpgaveSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
