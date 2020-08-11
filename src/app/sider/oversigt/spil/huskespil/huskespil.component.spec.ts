import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HuskespilComponent } from './huskespil.component';

describe('HuskespilComponent', () => {
  let component: HuskespilComponent;
  let fixture: ComponentFixture<HuskespilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HuskespilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HuskespilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
