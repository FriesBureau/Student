import { TestBed } from '@angular/core/testing';

import { AssistentService } from './assistent.service';

describe('AssistentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AssistentService = TestBed.get(AssistentService);
    expect(service).toBeTruthy();
  });
});
