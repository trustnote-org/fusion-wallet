import { Action, txType, txToType, jointType, unitMessagePayloadType } from './types.service';

import { NGXLogger } from 'ngx-logger';
import { Injectable } from '@angular/core';
import { ProfileService } from './profile.service';

@Injectable({
  providedIn: 'root'
})
export class FactoryService {
  public data: txType;

  constructor(private logger: NGXLogger, private profile: ProfileService) {
    this.data = <txType>{};
  }

  unpackUnit(joint: jointType): txType {
    const unit = joint.unit;
    this.data.unit = unit.unit;
    this.data.timestamp = unit.timestamp;
    this.data.fee = unit.headers_commission + unit.payload_commission;
    this.data.assetId = null;
    this.data.asset = 'TTT';
    this.data.stable = !!joint.ball;
    this.data.amount = {
      TTT: 0
    };
    this.data.to = [];

    if (unit.authors[0].address === this.profile.wallet.address) {
      // 支付行为
      this.data.action = Action.SENT;
      const arrFrom: string[] = [];
      arrFrom.push(unit.authors[0].address);
      this.data.from = arrFrom;
      unit.messages.forEach(item => {
        if (item.app === 'text') {
          // 消息文本
          this.data.message = <string>item.payload;
        } else if (item.app === 'payment') {
          // 正常交易
          (<unitMessagePayloadType>item.payload).outputs.forEach(output => {
            if (output.address !== unit.authors[0].address) {
              // 收款方不是自己
              const outputItem: txToType = {
                assetId: (<unitMessagePayloadType>item.payload).asset || null,
                address: output.address,
                amount: output.amount
              };
              this.data.to.push(outputItem);
              if (this.data.amount[outputItem.assetId || 'TTT']) {
                this.data.amount[outputItem.assetId || 'TTT'] += output.amount;
              } else {
                this.data.amount[outputItem.assetId || 'TTT'] = output.amount;
              }
              if (outputItem.assetId) {
                this.data.assetId = outputItem.assetId;
                // TODO 获得第三方资产名称
                this.data.asset = 'iToken';
              }
            } else {
              // 收款方是自己
              // TODO:
            }
          });
        } else {
          // 既不是消息也不是正常交易
          // TODO:
        }
      });
      this.logger.info(this.data);
    } else {
      // 收款行为
      this.data.action = Action.RECEIVED;
      const arrFrom: string[] = [];
      arrFrom.push(unit.authors[0].address);
      this.data.from = arrFrom;
      unit.messages.forEach(item => {
        if (item.app === 'text') {
          this.data.message = <string>item.payload;
        } else if (item.app === 'payment') {
          (<unitMessagePayloadType>item.payload).outputs.forEach(output => {
            if (output.address === this.profile.wallet.address) {
              const outputItem: txToType = {
                assetId: (<unitMessagePayloadType>item.payload).asset || null,
                address: output.address,
                amount: output.amount
              };
              this.data.to.push(outputItem);
              if (this.data.amount[outputItem.assetId || 'TTT']) {
                this.data.amount[outputItem.assetId || 'TTT'] += output.amount;
              } else {
                this.data.amount[outputItem.assetId || 'TTT'] = output.amount;
              }
              if (outputItem.assetId) {
                this.data.assetId = outputItem.assetId;
                // TODO 获得第三方资产名称
                this.data.asset = 'iToken';
              }
            }
          });
        }
      });
      this.logger.info(this.data);
    }
    return this.data;
  }
}
