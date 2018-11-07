import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { NetworkService } from '../../services/network.service';
import { NGXLogger } from 'ngx-logger';
import * as Core from 'wallet-base';
import { FactoryService } from '../../services/factory.service';

@Component({
  selector: 'app-send',
  templateUrl: './send.page.html',
  styleUrls: ['./send.page.scss']
})
export class SendPage implements OnInit {
  myAddress: string; // 我的地址
  // 要发送的数据
  transData: {
    asset: string;
    payer: string;
    message?: string;
    outputs: any[];
  };
  textToSign: string; // 签名信息
  txid: string; // 返回给后台的 txid
  path: string; // 签名路径
  constructor(
    private logger: NGXLogger,
    private profile: ProfileService,
    private network: NetworkService,
    private factory: FactoryService
  ) {
    this.myAddress = this.profile.wallet.address;
  }

  ngOnInit() {}

  // 发送 资产
  send() {
    this.transData = {
      asset: 'TTT',
      payer: this.myAddress,
      outputs: [
        {
          // address: this.payeeAddress,
          // amount: (this.paymentAmount - 0) * 1000000
          address: this.profile.wallet.address,
          amount: 500000
        }
      ]
    };

    this.network.transfer(this.transData).subscribe(response => {
      this.logger.info(response);
      this.textToSign = response.data.b64_to_sign; // 需要 签名信息
      this.txid = response.data.txid; // 返回给后台的 txid

      this.signAndSubmit();
    });
  }
  // 签名 & 提交
  signAndSubmit() {
    this.path = "m/44'/0'/0'/0/0"; // 签名路径
    let walletPrivkey = this.profile.wallet.privkey; // 当前钱包 根私钥
    let sig = Core.sign(this.textToSign, walletPrivkey, this.path); // 签名
    // 验证签名是否正确
    let ret = Core.verify(this.textToSign, sig, this.profile.wallet.addressPubkey);
    this.logger.info('本地验证结果: ', ret);
    if (ret) {
      let sigData = {
        txid: this.txid,
        sig: sig
      };
      this.logger.info('sigData: ', sigData);
      this.network.submitSig(sigData).subscribe(response => {
        this.logger.info('交易成功返回信息:', response);

        let tx = this.factory.unpackUnit(response.data.unit);
        this.profile.history[tx.unit] = tx;
        this.profile.storeHistory(this.profile.history).then(ret => {
          this.logger.info(ret);
        });
      });
    } else {
      this.logger.info('verify error');
      return;
    }
  }
}
