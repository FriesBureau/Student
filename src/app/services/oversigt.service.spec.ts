import { TestBed } from '@angular/core/testing';

import { OversigtService } from './oversigt.service';

describe('OversigtService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OversigtService = TestBed.get(OversigtService);
    expect(service).toBeTruthy();
  });
});
