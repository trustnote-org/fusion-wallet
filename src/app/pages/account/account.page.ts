import { Component, OnInit } from '@angular/core';

import { NetworkService } from '../../services/network.service';
import { FactoryService } from '../../services/factory.service';

import { historyType, txType, Action } from '../../services/types.service';
import { ProfileService } from '../../services/profile.service';
import _ from 'lodash';
import { NGXLogger } from 'ngx-logger';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss']
})
export class AccountPage implements OnInit {
  address: string;
  history: historyType;
  arrHistory: Array<any>;
  hasHistory: boolean;
  isUpdating: boolean;

  balance: any = 0;
  balanceDot: any = null;

  constructor(
    private logger: NGXLogger,
    private network: NetworkService,
    private profile: ProfileService,
    private factory: FactoryService
  ) {
    this.address = this.profile.wallet.address;
    this.history = {};
    this.hasHistory = true;
    this.arrHistory = [];
    this.isUpdating = false;
  }

  ngOnInit() {
    // 读取 profile中的余额
    this.profile.loadAsset().then(balance => {
      this.formatBalance(balance.TTT.balance);
    });
    // 本地存储 账单 (首先加载本地历史)
    this.profile.loadHistory().then(
      history => {
        if (history && Object.keys(history).length > 0) {
          this.history = history;
          let action: string;

          for (const key of Object.keys(history)) {
            if (history[key].action === Action.RECEIVED) {
              action = '收款';
            }
            if (history[key].action === Action.SENT) {
              action = '转账';
            }

            const obj = {
              action: action,
              date: this.formatDateTime(history[key].timestamp),
              amount: (history[key].amount.TTT / 1000000).toFixed(6),
              unit: history[key].unit
            };

            this.arrHistory.push(obj); // 前端页面遍历的 数组
          }
          _.reverse(this.arrHistory);
        }
        this.updateHistory();
      },
      error => {
        this.logger.error(error);
      }
    );
  }

  updateHistory() {
    this.isUpdating = true;
    this.network.getHistory(this.address, 'TTT', 1, 10).subscribe(
      res => {
        if (res.data.history.length > 0) {
          res.data.history.forEach(item => {
            let tx = this.factory.unpackUnit(item);
            this.history[tx.unit] = _.clone(tx);
          });

          let tempArrHistory = [];
          let action: string;

          for (const key of Object.keys(this.history)) {
            if (this.history[key].action === Action.RECEIVED) {
              action = '收款';
            }
            if (this.history[key].action === Action.SENT) {
              action = '转账';
            }

            const obj = {
              action: action,
              date: this.formatDateTime(this.history[key].timestamp),
              amount: (this.history[key].amount.TTT / 1000000).toFixed(6),
              unit: this.history[key].unit
            };
            tempArrHistory.push(obj);
          }

          this.arrHistory = _.reverse(tempArrHistory);
          this.isUpdating = false;

          this.profile.storeHistory(this.history).then(
            ret => {
              this.logger.debug(ret);
            },
            err => {
              this.logger.error(err);
            }
          );
        } else {
          this.hasHistory = false;
        }
      },
      err => {
        this.isUpdating = false;
        this.logger.error(err);
      }
    );
  }

  // 点击返回
  goBack() {
    history.go(-1);
  }

  // 时间戳 转换
  formatDateTime(inputTime) {
    let date = new Date(inputTime * 1000);
    let y = date.getFullYear();
    let m: any = date.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    let d: any = date.getDate();
    d = d < 10 ? '0' + d : d;
    let h: any = date.getHours();
    h = h < 10 ? '0' + h : h;
    let minute: any = date.getMinutes();
    let second: any = date.getSeconds();
    minute = minute < 10 ? '0' + minute : minute;
    second = second < 10 ? '0' + second : second;
    return y + '-' + m + '-' + d + ' ' + '　' + h + ':' + minute + ':' + second;
  }
  // 格式化 余额显示
  formatBalance(asset) {
    const strBalance = (asset / 1000000).toString();
    const dotNum = strBalance.indexOf('.');
    if (dotNum === -1) {
      this.balance = strBalance.replace(/(\d{1,3})(?=(\d{3})+$)/g, '$1,');
      this.balanceDot = '.00';
    } else {
      this.balance = strBalance.substr(0, dotNum).replace(/(\d{1,3})(?=(\d{3})+$)/g, '$1,');
      this.balanceDot = strBalance.substr(dotNum, 3);
    }
  }
}
