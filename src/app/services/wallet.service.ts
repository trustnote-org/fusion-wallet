import { ResultService } from './result.service';
import { Injectable } from '@angular/core';
import { walletType } from './types.service';
import * as Core from 'wallet-base';
import { NGXLogger } from 'ngx-logger';

@Injectable({
  providedIn: 'root'
})
export class WalletService {
  wallet: walletType;
  constructor(private result: ResultService, private logger: NGXLogger) {}

  public createWallet(password: string, mnemonic?: string): Promise<walletType> {
    return new Promise((resolve, rejects) => {
      try {
        const _mnemonic = Core.mnemonic(mnemonic);
        if (!_mnemonic) {
          throw new Error('Create Mnemonic Error');
        }
        const _privKey = Core.xPrivKey(_mnemonic, password);
        if (!_privKey) {
          throw new Error('Create PrivateKey Error');
        }
        const _walletPubKey = Core.walletPubKey(_privKey, 0);
        if (!_walletPubKey) {
          throw new Error('Create Wallet PubKey Error');
        }
        const _walletAddress = Core.walletAddress(_walletPubKey, 0, 0);
        const _addressPubKey = Core.walletAddressPubkey(_walletPubKey, 0, 0);
        const _walletId = Core.walletID(_walletPubKey);
        this.wallet = {
          mnemonic: _mnemonic,
          privkey: _privKey,
          pubkey: _walletPubKey,
          address: _walletAddress,
          addressPubkey: _addressPubKey,
          walletId: _walletId
        };
        resolve(this.wallet);
      } catch (error) {
        this.logger.debug(error);
        rejects(this.result.error(error.message));
      }
    });
  }

  public sign(unitHash: string, privateKey: string): Promise<any> {
    return new Promise((resolve, rejects) => {
      try {
        const sig = Core.sign(unitHash, privateKey, "m/44'/0'/0'/0/0");
        if (!sig) {
          throw new Error('Sign Error');
        }
        resolve(sig);
      } catch (error) {
        this.logger.debug(error);
        rejects(this.result.error(error.message));
      }
    });
  }

  public isValidAddress(address: string): boolean {
    return Core.isValidAddress(address);
  }

  // TODO: BTC wallet
  public createBTCWallet() {}

  // TODO: ETH wallet
  public createETHWallet() {}
}
