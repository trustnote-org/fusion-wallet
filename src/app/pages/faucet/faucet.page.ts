import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

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
  address: string;
  isGotCoin: boolean;

  constructor(
    private translate: TranslateService,
    private profileService: ProfileService,
    private networkService: NetworkService,
    private tipsService: TipsService,
    private logger: NGXLogger
  ) {
    this.address = this.profileService.wallet.address;
    this.isGotCoin = this.profileService.status.isGotCoin;
  }

  ngOnInit() {}

  getCoin() {
    this.tipsService.loading();
    this.networkService.getCoin().subscribe(
      success => {
        // TODO: 校验返回是否存在 error
        this.tipsService.alert(this.translate.instant('10MN TTT-Test received'), null);
        if (!this.isGotCoin) {
          this.isGotCoin = true;
          let status = this.profileService.status;
          status.isGotCoin = true;
          this.profileService.storeStatus(status);
        }
        this.logger.debug(success);
      },
      error => {
        this.tipsService.alert(this.translate.instant('Failed'), this.translate.instant('Service is busy, Please try again later'));
        this.logger.error(error);
      }
    );
  }

  goBack() {
    history.go(-1);
  }
}
