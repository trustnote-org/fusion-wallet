import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProfileService } from '../../services/profile.service';
import { NGXLogger } from 'ngx-logger';

@Component({
  selector: 'app-miniapp',
  templateUrl: './miniapp.page.html',
  styleUrls: ['./miniapp.page.scss']
})
export class MiniappPage implements OnInit {
  miniAppId: number;
  apptitle: string;
  appaddress: string;
  isEdit = false;
  couldClick: boolean;
  fromMore: boolean;

  constructor(private router: Router, private activate: ActivatedRoute, private profile: ProfileService, private logger: NGXLogger) {
    this.activate.queryParams.subscribe(params => {
      this.couldClick = false;
      this.miniAppId = params.id;
      if (params.fromMore) {
        this.fromMore = params.fromMore;
      }
      if (params.edit) {
        this.isEdit = params.edit;
        this.apptitle = this.profile.miniApp[this.miniAppId].title;
        this.appaddress = this.profile.miniApp[this.miniAppId].url;
        this.couldClick = true;
      }
    });
  }

  ngOnInit() {}

  // 返回
  goBack() {
    if (this.fromMore) {
      this.router.navigate(['/more']);
    } else {
      this.router.navigate(['/home']);
    }
  }

  // 判断 按钮是否可以点击
  onClickItem(val) {
    if (this.apptitle && this.appaddress) {
      this.couldClick = true;
    } else {
      this.couldClick = false;
    }
    this.logger.info(this.couldClick);
  }

  // 保存 mini app
  storeApp() {
    if (!this.couldClick) {
      this.logger.info('****不能保存 格式不正确*****');
      return false;
    }
    let pattern = /^((https|http)?:\/\/)/; // 正则表达式
    if (!pattern.test(this.appaddress)) {
      this.appaddress = 'http://' + this.appaddress;
    }
    let appid = this.miniAppId;
    this.profile.miniApp[appid] = {
      title: this.apptitle,
      icon: '../../../assets/img/shili.png',
      url: this.appaddress
    };
    this.profile
      .storeMiniApp(this.profile.miniApp)
      .then(res => {
        this.goBack();
      })
      .catch(rej => {
        this.logger.error(rej);
      });
  }

  // 删除 mini app
  delteApp() {
    let tepmObj = this.profile.miniApp;
    delete tepmObj[this.miniAppId];
    this.profile.storeMiniApp(tepmObj).then(res => {
      this.goBack();
    });
  }
}
