import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrugerComponent } from './bruger.component';

describe('BrugerComponent', () => {
  let component: BrugerComponent;
  let fixture: ComponentFixture<BrugerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrugerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrugerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
