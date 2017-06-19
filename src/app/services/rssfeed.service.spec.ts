import { TestBed, inject } from '@angular/core/testing';

import { RssfeedService } from './rssfeed.service';

describe('RssfeedService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RssfeedService]
    });
  });

  it('should be created', inject([RssfeedService], (service: RssfeedService) => {
    expect(service).toBeTruthy();
  }));
});
