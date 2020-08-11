import { TestBed } from '@angular/core/testing';

import { OpgaveService } from './opgave.service';

describe('OpgaveService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OpgaveService = TestBed.get(OpgaveService);
    expect(service).toBeTruthy();
  });
});
