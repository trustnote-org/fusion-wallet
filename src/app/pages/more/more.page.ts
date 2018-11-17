import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { Router, NavigationStart } from '@angular/router';
import { NGXLogger } from 'ngx-logger';

@Component({
  selector: 'app-more',
  templateUrl: './more.page.html',
  styleUrls: ['./more.page.scss']
})
export class MorePage implements OnInit {
  sourceSet = {};
  sourceSetTitle = {};

  constructor(private profile: ProfileService, private router: Router, private logger: NGXLogger) {}

  ngOnInit() {
    // 渲染 miniApp
    this.deployMiniApp();

    // 路由more 检查
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart && event.url === '/more') {
        this.deployMiniApp();
      }
    });
  }

  // 点击 返回
  goBack() {
    this.router.navigate(['/home']);
  }

  // miniApp 列表
  deployMiniApp() {
    if (this.profile.miniApp) {
      this.sourceSet = {};
      this.sourceSetTitle = {};
      for (const key of Object.keys(this.profile.miniApp)) {
        this.sourceSet['miniappurl' + key] = this.profile.miniApp[key].icon;
        this.sourceSetTitle['miniapptitle' + key] = this.profile.miniApp[key].title;
      }
    }
  }

  // 添加 or 进入 小程序
  addMiniApp(num) {
    if (this.sourceSetTitle['miniapptitle' + num]) {
      this.router.navigate(['/browser'], {
        queryParams: {
          url: this.profile.miniApp[num].url,
          title: this.profile.miniApp[num].title,
          fromMore: true
        }
      });
    } else {
      this.router.navigate(['/miniapp'], { queryParams: { id: num, fromMore: true } });
    }
  }

  // onPress 编辑 小程序
  editMiniApp(num) {
    if (this.sourceSetTitle['miniapptitle' + num]) {
      this.router.navigate(['/miniapp'], { queryParams: { id: num, edit: true, fromMore: true } });
    } else {
      this.logger.info('none miniApp...');
      return false;
    }
  }
}
