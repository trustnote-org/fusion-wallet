import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';

import { NGXLogger } from 'ngx-logger';
import { ProfileService } from '../../services/profile.service';
import { NetworkService } from '../../services/network.service';
import { TipsService } from '../../services/tips.service';

@Component({
  selector: 'app-faucet',
  templateUrl: './faucet.page.html',
  styleUrls: ['./faucet.page.scss']
})
export class FaucetPage implements OnInit {
  isGotCoin: boolean;

  constructor(
    private profileService: ProfileService,
    private networkService: NetworkService,
    public loadingController: LoadingController,
    private tipsService: TipsService,
    private logger: NGXLogger
  ) {
    this.isGotCoin = this.profileService.status.isGotCoin;
  }

  ngOnInit() {}

  getCoin() {
    this.presentLoading();
    this.networkService.getCoin().subscribe(
      success => {
        this.loadingController.dismiss();
        this.tipsService.alert('领取成功', null);
        if (!this.isGotCoin) {
          this.isGotCoin = true;
          let status = this.profileService.status;
          status.isGotCoin = true;
          this.profileService.storeStatus(status);
        }
        this.logger.debug(success);
      },
      error => {
        this.loadingController.dismiss();
        this.tipsService.alert('领取失败', '稍后再试');
        this.logger.error(error);
      }
    );
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: '正在领取...',
      duration: 10000
    });
    return await loading.present();
  }

  goBack() {
    history.go(-1);
  }
}
