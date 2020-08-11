import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DokumenterComponent } from './dokumenter.component';

describe('DokumenterComponent', () => {
  let component: DokumenterComponent;
  let fixture: ComponentFixture<DokumenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DokumenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DokumenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
