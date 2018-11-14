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
  // localTitle: string;
  // localUrl: string;

  constructor(
    private router: Router,
    private activate: ActivatedRoute,
    private profile: ProfileService,
    private logger: NGXLogger
  ) {
    this.activate.queryParams.subscribe(params => {
      this.miniAppId = params.id;
      if (params.edit) {
        this.isEdit = params.edit;
        this.apptitle = this.profile.miniApp[this.miniAppId].title;
        this.appaddress = this.profile.miniApp[this.miniAppId].url;
      }
    });
  }

  ngOnInit() {}
  // 返回
  goBack() {
    this.router.navigate(['/home']);
  }
  // 保存 mini app
  storeApp() {
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
