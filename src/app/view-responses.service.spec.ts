import { TestBed } from '@angular/core/testing';

import { ViewResponsesService } from './view-responses.service';

describe('ViewResponsesService', () => {
  let service: ViewResponsesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewResponsesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
