import { TestBed } from '@angular/core/testing';

import { LektionService } from './lektion.service';

describe('LektionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LektionService = TestBed.get(LektionService);
    expect(service).toBeTruthy();
  });
});
