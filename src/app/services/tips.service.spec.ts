import { TestBed } from '@angular/core/testing';

import { TipsService } from './tips.service';

describe('TipsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TipsService = TestBed.get(TipsService);
    expect(service).toBeTruthy();
  });
});
