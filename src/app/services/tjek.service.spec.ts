import { TestBed } from '@angular/core/testing';

import { TjekService } from './tjek.service';

describe('TjekService', () => {
  let service: TjekService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TjekService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
