import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditListNameComponent } from './edit-list-name.component';

describe('EditListNameComponent', () => {
  let component: EditListNameComponent;
  let fixture: ComponentFixture<EditListNameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditListNameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditListNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
