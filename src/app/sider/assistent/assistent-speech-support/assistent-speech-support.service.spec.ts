import { TestBed } from '@angular/core/testing';

import { AssistentSpeechSupportService } from './assistent-speech-support.service';

describe('AssistentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AssistentSpeechSupportService = TestBed.get(AssistentSpeechSupportService);
    expect(service).toBeTruthy();
  });
});
