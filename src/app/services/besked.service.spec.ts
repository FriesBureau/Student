import { TestBed } from '@angular/core/testing';

import { BeskedService } from './besked.service';

describe('BeskedService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BeskedService = TestBed.get(BeskedService);
    expect(service).toBeTruthy();
  });
});
