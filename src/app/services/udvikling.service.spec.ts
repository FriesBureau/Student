import { TestBed } from '@angular/core/testing';

import { UdviklingService } from './udvikling.service';

describe('UdviklingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UdviklingService = TestBed.get(UdviklingService);
    expect(service).toBeTruthy();
  });
});
