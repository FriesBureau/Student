import { TestBed } from '@angular/core/testing';

import { ChattestService } from './chattest.service';

describe('ChattestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChattestService = TestBed.get(ChattestService);
    expect(service).toBeTruthy();
  });
});
