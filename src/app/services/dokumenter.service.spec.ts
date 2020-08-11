import { TestBed } from '@angular/core/testing';

import { DokumenterService } from './dokumenter.service';

describe('DokumenterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DokumenterService = TestBed.get(DokumenterService);
    expect(service).toBeTruthy();
  });
});
