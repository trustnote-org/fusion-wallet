import { Injectable } from "@angular/core";

export enum Action {
  SENT = "sent",
  RECEIVED = "received"
}

// 钱包存储类型
export type walletType = {
  walletId: string; // 钱包ID
  mnemonic: string; // 助记词
  privkey: string; // 根私钥
  privkeyEncrypted?: any; // 加密根私钥
  pubkey: string; // 钱包公钥
  addressPubkey: string; // 地址公钥
  address: string; // 地址
};

// 币种存储类型
export type coinType = {
  assetId: string; // 资产ID
  issuer: string; // 发行者
  balance: number; // 余额
};

// 资产存储类型
export type assetType = {
  TTT: coinType; // TTT资产
  [propName: string]: coinType;
};

export type txAmountType = {
  TTT: number;
  [propName: string]: number;
};

export type txToType = {
  assetId: string;
  address: string;
  amount: number;
};

// 交易详情类型
export type txType = {
  action: Action; // sent received
  asset: string; // 资产类型,TTT默认为 “TTT"
  assetId: string; // 资产ID,TTT默认为 null
  unit: string; // unit
  from: string[]; // 支付方
  to: txToType[]; //收款方
  amount: txAmountType; // 支付金额
  message: string; // 附加消息
  fee: number; // 费用
  stable: boolean; // 是否稳定
  timestamp: number; // 时间
};

// 历史记录类型
export type historyType = {
  [key: string]: txType;
};

// 交易单元类型
export type unitType = {
  version: string;
  alt: string;
  messages: unitMessageType[];
  authors: unitAuthorsType[];
  parent_units: string[];
  last_ball: string;
  last_ball_unit: string;
  witness_list_unit: string;
  unit: string;
  earned_headers_commission_recipients: any[];
  headers_commission: number;
  payload_commission: number;
  timestamp: number;
};

// 交易单元message类型
export type unitMessageType = {
  app: string;
  payload_location: string;
  payload_hash: string;
  payload: unitMessagePayloadType | string;
};

// 交易单元payload类型
export type unitMessagePayloadType = {
  asset?: string;
  outputs: unitMessagePayloadOutputsType[];
  inputs: unitMessagePayloadInputsType[];
};

// 交易单元outputs类型
export type unitMessagePayloadOutputsType = {
  address: string;
  amount: number;
};

// 交易单元inputs类型
export type unitMessagePayloadInputsType = {
  unit: string;
  message_index: number;
  output_index: number;
};

// 交易单元作者类型
export type unitAuthorsType = {
  address: string;
  authentifiers: unitAuthorsAuthentifiers;
  definition?: any[];
};

export type paymentType = {
  payer: string;
  outputs: unitMessagePayloadOutputsType[];
  message?: string;
};

// 交易单元作者签名类型
export type unitAuthorsAuthentifiers = {
  r: string;
};

// 设置存储类型
export type settingType = {
  language: string;
  currency: string; // 显示货币类型
};

// 配置存储类型
export type configType = {
  restAPI: string;
  restAPI_dev: string;
  assetAPI: string;
  assetAPI_dev: string;
  rateUrl: string;
  miniAppUrl: string;
  miniAppUrl_dev: string;
  downloadUrl: string;
  releaseUrl: string;
  network: string;
  log: {
    weight: number;
  };
};

// 状态存储类型
export type statusType = {
  agree: boolean;
  isLock: boolean; // 是否设置支付密码
};

// 返回结果类型
export type resultType = {
  status: string;
  msg: any;
};

// rest接口返回类型
export type ResponseType = {
  errCode: number;
  errMsg: string;
  data: any;
};

@Injectable({
  providedIn: 'root',
})

export class TypesService { }
