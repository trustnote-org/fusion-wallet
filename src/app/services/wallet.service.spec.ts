import { TestBed } from '@angular/core/testing';

import { WalletService } from './wallet.service';

describe('ConfigService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WalletService = TestBed.get(WalletService);
    expect(service).toBeTruthy();
  });
});
