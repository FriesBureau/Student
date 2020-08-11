import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LektionComponent } from './lektion.component';

describe('LektionerComponent', () => {
  let component: LektionComponent;
  let fixture: ComponentFixture<LektionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LektionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LektionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
