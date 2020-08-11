import { TestBed } from '@angular/core/testing';

import { KursusService } from './kursus.service';

describe('KursusService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: KursusService = TestBed.get(KursusService);
    expect(service).toBeTruthy();
  });
});
