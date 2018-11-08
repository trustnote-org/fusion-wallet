import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';

import { NGXLogger } from 'ngx-logger';
import { NetworkService } from '../../services/network.service';
import { TipsService } from '../../services/tips.service';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-faucet',
  templateUrl: './faucet.page.html',
  styleUrls: ['./faucet.page.scss']
})
export class FaucetPage implements OnInit {
  address: string;

  constructor(
    private networkService: NetworkService,
    public loadingController: LoadingController,
    private tipsService: TipsService,
    private profile: ProfileService,
    private logger: NGXLogger
  ) {
    this.address = this.profile.wallet.address;
  }

  ngOnInit() {}

  getCoin() {
    this.presentLoading();
    this.networkService.getCoin().subscribe(
      success => {
        this.loadingController.dismiss();
        this.tipsService.alert('领取成功', null);
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
