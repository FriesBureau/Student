import { TestBed } from '@angular/core/testing';

import { MatSidenavService } from './mat-sidenav.service';

describe('MatSidenavService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MatSidenavService = TestBed.get(MatSidenavService);
    expect(service).toBeTruthy();
  });
});
