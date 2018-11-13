import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProfileService } from '../../services/profile.service';
import { miniAppType } from '../../services/types.service';

@Component({
  selector: 'app-miniapp',
  templateUrl: './miniapp.page.html',
  styleUrls: ['./miniapp.page.scss']
})
export class MiniappPage implements OnInit {
  miniAppId: number;
  apptitle: string;
  appaddress: string;

  constructor(
    private router: Router,
    private activate: ActivatedRoute,
    private profile: ProfileService
  ) {
    this.activate.queryParams.subscribe(params => {
      this.miniAppId = params.id;
    });
  }

  ngOnInit() {}
  // 返回
  goBack() {
    this.router.navigate(['/home']);
  }
  // 保存 mini app
  storeApp() {
    console.log(this.apptitle, this.appaddress);
    let appid = this.miniAppId;
    let obj: miniAppType = {};
    obj[appid] = {
      title: this.apptitle,
      icon:
        'http://img.zcool.cn/community/01a87856e6bac032f875520fdd2b1d.JPG@1280w_1l_2o_100sh.jpg',
      url: this.appaddress
    };
    this.profile.storeMiniApp(obj).then(res => {
      console.log(res);
      this.goBack();
    });
  }
}
