import { Component, OnInit } from "@angular/core";

import { NetworkService } from "../../services/network.service";
import { FactoryService } from "../../services/factory.service";

import { historyType, txType } from "../../services/types.service";
import { ProfileService } from "../../services/profile.service";
import _ from "lodash";

@Component({
  selector: "app-account",
  templateUrl: "./account.page.html",
  styleUrls: ["./account.page.scss"]
})
export class AccountPage implements OnInit {
  history: historyType;
  historyStore: historyType;
  constructor(
    private NetworkService: NetworkService,
    private ProfileService: ProfileService,
    private FactoryService: FactoryService
  ) {
    this.history = {};
    this.historyStore = {};
  }

  ngOnInit() {
    this.ProfileService.loadHistory().then(ret => {
      for (const key of Object.keys(ret)) {
        console.log(ret[key]);
      }
    });

    return;

    var addr = "ZDKNB2DQJPQR7PKYI37A5M2MTU5SIZ2A";
    this.NetworkService.getHistory(addr, "TTT", 1, 5).subscribe(res => {
      // console.log(this.FactoryService.unpackUnit(res.data.history[0].unit));
      // console.log(res.data.history);
      res.data.history.forEach(item => {
        //console.log(item);
        let tx = this.FactoryService.unpackUnit(item.unit);
        this.history[tx.unit] = _.clone(tx);
        //console.log(this.history);
      });

      var historyList = [];
      for (const key of Object.keys(this.history)) {
        historyList.push(this.history[key]);
      }
      historyList = historyList.sort(this.compare);
      console.log("----------", historyList);
      for (var i = 0; i < historyList.length; i++) {
        this.historyStore[historyList[i].unit] = _.clone(historyList[i]);
      }

      console.log("****************************");
      // console.log(this.historyStore);
      for (const key of Object.keys(this.historyStore)) {
        console.log(this.historyStore[key]);
      }

      this.ProfileService.storeHistory(this.history);
    });
  }

  // 点击返回
  goBack() {
    history.go(-1);
  }
  // 排序
  compare(obj1, obj2) {
    var val1 = obj1.timestamp;
    var val2 = obj2.timestamp;
    if (val1 < val2) {
      return 1;
    } else if (val1 > val2) {
      return -1;
    } else {
      return 0;
    }
  }
}
