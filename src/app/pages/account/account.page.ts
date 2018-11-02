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
  addr: string;
  history: historyType;
  // historyStore: historyType;
  historyArr: Array<any>;
  tit: string;
  date: any;
  amount: any;
  unit: string;
  hasHistory: boolean;

  constructor(
    private logger: NGXLogger,
    private network: NetworkService,
    private profile: ProfileService,
    private factory: FactoryService
  ) {
    this.history = {};
    // this.historyStore = {};
    this.historyArr = [];
  }

  ngOnInit() {
    // 本地存储 账单 (首先加载本地历史)
    this.profile.loadHistory().then(
      ret => {
        if (ret && Object.keys(ret).length > 0) {
          this.hasHistory = true;
          for (const key of Object.keys(ret)) {
            // console.log(ret[key]);
            if (ret[key].action === Action.RECEIVED) {
              // this.tit = 'from ' + ret[key].from[0];
              this.tit = '收款';
            }
            if (ret[key].action === Action.SENT) {
              // this.tit = 'to ' + ret[key].to[0];
              this.tit = '转账';
            }
            this.date = this.formatDateTime(ret[key].timestamp);
            this.amount = ret[key].amount.TTT;
            this.unit = ret[key].unit;

            const obj = { tit: this.tit, date: this.date, amount: this.amount, unit: this.unit };
            this.historyArr.push(obj); // 前端页面遍历的 数组
          }
        } else {
          this.hasHistory = false;
        }
      },
      reject => {
        this.logger.info('加载本地历史记录出错', reject);
      }
    );
    // console.log(this.historyArr);

    // this.addr = 'ZDKNB2DQJPQR7PKYI37A5M2MTU5SIZ2A';
    this.addr = this.profile.wallet.address;
    this.network.getHistory(this.addr, 'TTT', 1, 5).subscribe(
      res => {
        // console.log(this.factory.unpackUnit(res.data.history[0].unit));
        // console.log(res.data.history);
        res.data.history.forEach(item => {
          let tx = this.factory.unpackUnit(item);
          this.history[tx.unit] = _.clone(tx);
        });

        // let historyList = [];
        // for (const key of Object.keys(this.history)) {
        //   historyList.push(this.history[key]);
        // }
        // historyList = historyList.sort(this.compare);
        // // console.log('----------', historyList);
        // for (let i = 0; i < historyList.length; i++) {
        //   this.historyStore[historyList[i].unit] = _.clone(historyList[i]);
        // }
        // console.log('****************************');
        // console.log(this.historyStore);
        // for (const key of Object.keys(this.historyStore)) {
        //   console.log(this.historyStore[key]);
        // }

        this.profile.storeHistory(this.history).then(
          ret => {
            this.profile.loadHistory().then(
              ret => {
                if (Object.keys(ret)[0] === this.historyArr[0].unit) {
                  return;
                }
                for (const key of Object.keys(ret)) {
                  // console.log(ret[key]);
                  if (ret[key].action === Action.RECEIVED) {
                    // this.tit = 'from ' + ret[key].from[0];
                    this.tit = '收款';
                  }
                  if (ret[key].action === Action.SENT) {
                    // this.tit = 'to ' + ret[key].to[0];
                    this.tit = '转账';
                  }
                  this.date = this.formatDateTime(ret[key].timestamp);
                  this.amount = ret[key].amount.TTT;
                  this.unit = ret[key].unit;

                  const obj = {
                    tit: this.tit,
                    date: this.date,
                    amount: this.amount,
                    unit: this.unit
                  };
                  this.historyArr.push(obj); // 前端页面遍历的 数组
                }
              },
              reject => {
                this.logger.info('二次读取历史出错');
              }
            );
          },
          err => {
            this.logger.info('存储历史出错');
          }
        );
      },
      err => {
        this.logger.info('网络获取历史记录出错');
      }
    );
  }

  // 点击返回
  goBack() {
    history.go(-1);
  }
  // 排序
  compare(obj1, obj2) {
    let val1 = obj1.timestamp;
    let val2 = obj2.timestamp;
    if (val1 < val2) {
      return 1;
    } else if (val1 > val2) {
      return -1;
    } else {
      return 0;
    }
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
}
