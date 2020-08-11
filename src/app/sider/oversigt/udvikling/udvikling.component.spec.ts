import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UdviklingComponent } from './udvikling.component';

describe('UdviklingComponent', () => {
  let component: UdviklingComponent;
  let fixture: ComponentFixture<UdviklingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UdviklingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UdviklingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
