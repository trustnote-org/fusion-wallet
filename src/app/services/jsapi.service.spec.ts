import { TestBed } from '@angular/core/testing';

import { JSApiService } from './jsapi.service';

describe('JSApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JSApiService = TestBed.get(JSApiService);
    expect(service).toBeTruthy();
  });
});
