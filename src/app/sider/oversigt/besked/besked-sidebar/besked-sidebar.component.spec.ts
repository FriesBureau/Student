import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeskedSidebarComponent } from './besked-sidebar.component';

describe('BeskedSidebarComponent', () => {
  let component: BeskedSidebarComponent;
  let fixture: ComponentFixture<BeskedSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeskedSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeskedSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
