import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeskedComponent } from './besked.component';

describe('BeskedComponent', () => {
  let component: BeskedComponent;
  let fixture: ComponentFixture<BeskedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeskedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeskedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
