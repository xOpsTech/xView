import { TestBed, inject } from '@angular/core/testing';

import { PerfIndicatorService } from './perf-indicator.service';

describe('PerfIndicatorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PerfIndicatorService]
    });
  });

  it('should be created', inject([PerfIndicatorService], (service: PerfIndicatorService) => {
    expect(service).toBeTruthy();
  }));
});
