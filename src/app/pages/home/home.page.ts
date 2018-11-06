import { Component, OnInit } from '@angular/core';
import { NGXLogger } from 'ngx-logger';

// 引入服务
import { NetworkService } from '../../services/network.service';
import { ProfileService } from '../../services/profile.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {
  balance: any = 0;
  balanceDot: any = null;
  loginDate: {
    pubkey: string;
  };

  constructor(
    private logger: NGXLogger,
    private network: NetworkService,
    private profile: ProfileService,
    private router: Router
  ) {}

  ngOnInit() {
    this.logger.debug('homepage');
    this.logger.debug('wallet.address:', this.profile.wallet.address);
    this.logger.debug('wallet.addressPubkey:', this.profile.wallet.addressPubkey);

    // 登录注册
    this.loginDate = {
      pubkey: this.profile.wallet.pubkey
    };
    this.network.login(this.loginDate).subscribe(response => {
      this.logger.info(response);
    });

    // 刷新余额
    this.fetchBalance();
  }

  // 进入 账单
  goAccount() {
    this.router.navigate(['/account']);
  }
  // 进入 示例程序
  goExamples() {
    this.router.navigate(['/examples']);
  }
  // 领取 TTT
  goDrawttt() {
    this.router.navigate(['/faucet']);
  }
  // 进入 文档中心
  goDocs() {
    this.router.navigate(['/doc']);
  }
  // 进入 帮助
  goHelp() {
    this.router.navigate(['/help']);
  }

  // long press(长按)
  onPressUp($event) {
    this.router.navigate(['/setting']);
  }
  // on tap(点击)
  onTap($event) {
    this.router.navigate(['/more']);
  }
  // 进入 发送
  goSend(){
    this.router.navigate(['/send']);
  }
  // 格式化 余额显示
  formatBalance(res) {
    const strBalance = (res.data.stable / 1000000).toString();
    const dotNum = strBalance.indexOf('.');
    if (dotNum === -1) {
      this.balance = strBalance.replace(/(\d{1,3})(?=(\d{3})+$)/g, '$1,');
      this.balanceDot = '.00';
    } else {
      this.balance = strBalance.substr(0, dotNum).replace(/(\d{1,3})(?=(\d{3})+$)/g, '$1,');
      this.balanceDot = strBalance.substr(dotNum, 3);
    }
  }
  // 刷新余额
  fetchBalance() {
    const address = this.profile.wallet.address;
    this.network.getBalance(address).subscribe(
      res => {
        this.formatBalance(res);
      },
      err => {
        this.logger.info('获取余额错误', err);
      }
    );
  }
  // 下拉刷新
  refresh(refresher) {
    refresher.preventDefault();
    this.logger.info('getBalance start...');
    this.logger.info(refresher);
    const address = this.profile.wallet.address;
    this.network.getBalance(address).subscribe(
      res => {
        this.formatBalance(res);
        refresher.target.complete();
      },
      err => {
        this.logger.info('获取余额错误', err);
        refresher.target.cancel();
      }
    );
  }
}
