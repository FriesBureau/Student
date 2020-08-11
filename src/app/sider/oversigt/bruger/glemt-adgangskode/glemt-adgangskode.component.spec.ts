import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlemtAdgangskodeComponent } from './glemt-adgangskode.component';

describe('GlemtAdgangskodeComponent', () => {
  let component: GlemtAdgangskodeComponent;
  let fixture: ComponentFixture<GlemtAdgangskodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlemtAdgangskodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlemtAdgangskodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
