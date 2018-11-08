import { Component, OnInit } from '@angular/core';
import { NGXLogger } from 'ngx-logger';

// 引入服务
import { NetworkService } from '../../services/network.service';
import { ProfileService } from '../../services/profile.service';

import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {
  balance: any = 0;
  balanceDot: any = null;
  address: string;
  isPending: number;
  isGotCoin: boolean;

  constructor(
    private logger: NGXLogger,
    private network: NetworkService,
    private profile: ProfileService,
    private router: Router
  ) {
    this.address = this.profile.wallet.address;
    this.isGotCoin = this.profile.status.isGotCoin;
  }

  ngOnInit() {
    this.logger.debug('homepage');
    this.logger.debug('address:', this.address);
    this.logger.debug('pubkey:', this.profile.wallet.pubkey);
    // 登录注册
    const loginDate = {
      pubkey: this.profile.wallet.pubkey
    };
    this.network.login(loginDate).subscribe(response => {
      this.logger.debug(response);
    });
    // 刷新余额
    this.fetchBalance();
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart && event.url === '/home') {
        this.isGotCoin = this.profile.status.isGotCoin;
        this.fetchBalance();
      }
    });
  }

  // 格式化 余额显示
  formatBalance(res) {
    const strBalance = ((res.data.stable + res.data.pending) / 1000000).toString();
    const dotNum = strBalance.indexOf('.');
    if (dotNum === -1) {
      this.balance = strBalance.replace(/(\d{1,3})(?=(\d{3})+$)/g, '$1,');
      this.balanceDot = '.00';
    } else {
      this.balance = strBalance.substr(0, dotNum).replace(/(\d{1,3})(?=(\d{3})+$)/g, '$1,');
      this.balanceDot = strBalance.substr(dotNum, 3);
    }
    if (res.data.pending > 0) {
      this.isPending = res.data.pending / 1000000;
    } else {
      this.isPending = 0;
    }
  }
  // 刷新余额
  fetchBalance() {
    this.network.getBalance(this.address).subscribe(
      res => {
        this.formatBalance(res);
        // 存储到 profile
        const balanceObj = {
          TTT: {
            assetId: null,
            issuer: 'TrustNote',
            balance: res.data.stable + res.data.pending
          }
        };
        this.profile.storeAsset(balanceObj).then(suc => {});
      },
      err => {
        this.logger.error(err);
      }
    );
  }
  // 下拉刷新
  refresh(refresher) {
    refresher.preventDefault();
    this.logger.info('refreshing balance...');
    this.network.getBalance(this.address).subscribe(
      res => {
        this.formatBalance(res);
        refresher.target.complete();
      },
      err => {
        this.logger.error(err);
        refresher.target.cancel();
      }
    );
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
}
