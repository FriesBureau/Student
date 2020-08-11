import { TestBed } from '@angular/core/testing';

import { KalenderService } from './kalender.service';

describe('KalenderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: KalenderService = TestBed.get(KalenderService);
    expect(service).toBeTruthy();
  });
});
