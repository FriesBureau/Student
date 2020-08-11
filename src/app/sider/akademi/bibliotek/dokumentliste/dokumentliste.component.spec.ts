import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DokumentlisteComponent } from './dokumentliste.component';

describe('DokumentlisteComponent', () => {
  let component: DokumentlisteComponent;
  let fixture: ComponentFixture<DokumentlisteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DokumentlisteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DokumentlisteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
