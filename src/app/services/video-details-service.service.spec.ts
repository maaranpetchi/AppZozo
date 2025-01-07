import { TestBed } from '@angular/core/testing';

import { VideoDetailsServiceService } from './video-details-service.service';

describe('VideoDetailsServiceService', () => {
  let service: VideoDetailsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VideoDetailsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
