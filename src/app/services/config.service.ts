import { Injectable } from '@angular/core';
import { NGXLogger } from "ngx-logger";
import { statusType, configType, settingType, walletType, assetType } from "./types.service";

const statusDefault: statusType = {
  agree: true,
  isLock: false
};

const configDefault: configType = {
  restAPI: "https://beta.itoken.top/api/v1",
  restAPI_dev: "http://150.109.57.242:6001/api/v1", //http://150.109.57.242:6001/api/v1/asset/balance/QSOMNL7YPFQCYDKFUO63Y7RBLXDRDVJX/TTT
  assetAPI: "https://itoken.top/token/query-token-detal.htm",
  assetAPI_dev: "https://beta.itoken.top//v1/token/query-token-detal",
  rateUrl: "https://api.coinmarketcap.com/v2/ticker/2701/?convert=CNY",
  miniAppUrl: "http://developers.trustnote.org/api",
  miniAppUrl_dev: "http://developers.trustnote.org/api",
  downloadUrl: "https://",
  releaseUrl: "https://",
  network: "testnet"
};

const settingDefault: settingType = {
  language: null,
  currency: "USD"
};

const walletDefault: walletType = {
  walletId: null,
  mnemonic: null,
  privkey: null,
  privkeyEncrypted: null,
  pubkey: null,
  addressPubkey: null,
  address: null
};

const assetDefault: assetType = {
  TTT: {
    assetId: null,
    issuer: "TrustNote",
    balance: 0
  }
};

@Injectable({
  providedIn: 'root'
})

export class ConfigService {

  constructor(private logger: NGXLogger) {
    this.logger.info("ConfigService initialized.");
  }

  get statusDefault() {
    return statusDefault;
  }

  get configDefault() {
    return configDefault;
  }

  get settingDefault() {
    return settingDefault;
  }

  get walletDefault() {
    return walletDefault;
  }

  get assetDefault() {
    return assetDefault;
  }
}
