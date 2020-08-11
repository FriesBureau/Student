import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VenstremenuComponent } from './venstremenu.component';

describe('BibliotekComponent', () => {
  let component: VenstremenuComponent;
  let fixture: ComponentFixture<VenstremenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VenstremenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VenstremenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
