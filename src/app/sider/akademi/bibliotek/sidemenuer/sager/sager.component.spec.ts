import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SagerComponent } from './sager.component';

describe('SagerComponent', () => {
  let component: SagerComponent;
  let fixture: ComponentFixture<SagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
