import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjektOversigtComponent } from './projektoversigt.component';

describe('ProjektOversigtComponent', () => {
  let component: ProjektOversigtComponent;
  let fixture: ComponentFixture<ProjektOversigtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjektOversigtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjektOversigtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
