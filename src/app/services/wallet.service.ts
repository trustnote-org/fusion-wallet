import { ResultService } from "./result.service";
import { Injectable } from "@angular/core";
import { walletType } from "./types.service";
import * as Core from "wallet-base";

@Injectable({
  providedIn: 'root',
})

export class WalletService {
  wallet: walletType;
  constructor(private result: ResultService) { }

  public createWallet(password: string, mnemonic?: string): Promise<walletType> {
    return new Promise((resolve, rejects) => {
      try {
        let _mnemonic = Core.mnemonic(mnemonic);
        if (!_mnemonic) throw "Create Mnemonic Error";
        let _privKey = Core.xPrivKey(_mnemonic, password);
        if (!_privKey) throw "Create PrivateKey Error";
        let _walletPubKey = Core.walletPubKey(_privKey, 0);
        if (!_walletPubKey) throw "Create Wallet PubKey Error";
        let _walletAddress = Core.walletAddress(_walletPubKey, 0, 0);
        let _addressPubKey = Core.walletAddressPubkey(_walletPubKey, 0, 0);
        let _walletId = Core.walletID(_walletPubKey);
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
        rejects(this.result.error(error));
      }
    });
  }

  public sign(unitHash: string, privateKey: string): Promise<any> {
    return new Promise((resolve, rejects) => {
      try {
        let sig = Core.sign(unitHash, privateKey, "m/44'/0'/0'/0/0");
        if (!sig) throw "Sign Error";
        resolve(sig);
      } catch (error) {
        rejects(this.result.error(error));
      }
    });
  }

  public isValidAddress(address: string): boolean {
    return Core.isValidAddress(address);
  }

  // TODO: BTC wallet
  public createBTCWallet() { }

  // TODO: ETH wallet
  public createETHWallet() { }
}
