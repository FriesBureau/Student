import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailGodkendelseComponent } from './email-godkendelse.component';

describe('EmailGodkendelseComponent', () => {
  let component: EmailGodkendelseComponent;
  let fixture: ComponentFixture<EmailGodkendelseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailGodkendelseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailGodkendelseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
