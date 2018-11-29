import { Injectable } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { statusType, configType, settingType, walletType, assetType } from './types.service';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  static statusDefault: statusType = {
    agree: true,
    isGotCoin: false,
    wallet: false,
    isLock: false
  };

  static configDefault: configType = {
    restAPI: 'https://beta.itoken.top/api/v1',
    restAPI_dev: 'http://150.109.57.242:6002/api/v1',
    faucetAPI: 'http://150.109.196.219:6553',
    assetAPI: 'https://itoken.top/token/query-token-detal.htm',
    assetAPI_dev: 'https://beta.itoken.top//v1/token/query-token-detal',
    rateUrl: 'https://api.coinmarketcap.com/v2/ticker/2701/?convert=CNY',
    miniAppUrl: 'http://developers.trustnote.org/api',
    miniAppUrl_dev: 'http://developers.trustnote.org/api',
    downloadUrl: 'https://',
    releaseUrl: 'https://',
    network: 'testnet'
  };

  static settingDefault: settingType = {
    language: null,
    currency: 'USD'
  };

  static walletDefault: walletType = {
    walletId: null,
    mnemonic: null,
    privkey: null,
    privkeyEncrypted: null,
    pubkey: null,
    addressPubkey: null,
    address: null
  };

  static assetDefault: assetType = {
    TTT: {
      assetId: null,
      issuer: 'TrustNote',
      balance: 0
    }
  };

  constructor(private logger: NGXLogger) {
    this.logger.info('ConfigService initialized.');
  }
}
