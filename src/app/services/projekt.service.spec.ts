import { TestBed } from '@angular/core/testing';

import { ProjektService } from './projekt.service';

describe('AdministratorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProjektService = TestBed.get(ProjektService);
    expect(service).toBeTruthy();
  });
});
