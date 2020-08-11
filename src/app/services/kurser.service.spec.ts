import { TestBed } from '@angular/core/testing';

import { KurserService } from './kurser.service';

describe('KurserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: KurserService = TestBed.get(KurserService);
    expect(service).toBeTruthy();
  });
});
