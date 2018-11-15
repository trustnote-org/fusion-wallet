import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

import { modalAlertEnter, modalAlertLeave } from '../../modal/modal.style';
import { MnemonicPage } from '../../modal/mnemonic/mnemonic.page';

import { ProfileService } from '../../services/profile.service';
import { TipsService } from '../../services/tips.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss']
})
export class SettingPage implements OnInit {
  constructor(
    private modalController: ModalController,
    private translate: TranslateService,
    private profileService: ProfileService,
    private tipsService: TipsService
  ) {}

  ngOnInit() {}
  goBack() {
    history.go(-1);
  }

  // 展示助记词
  async showMnemonic() {
    const modal = await this.modalController.create({
      component: MnemonicPage,
      enterAnimation: modalAlertEnter,
      leaveAnimation: modalAlertLeave,
      showBackdrop: true,
      backdropDismiss: true,
      componentProps: {}
    });
    return await modal.present();
  }

  resetWallet() {
    this.tipsService.loading();
    this.profileService
      .clearAllProfile()
      .then(ret => {
        this.tipsService.alert(this.translate.instant('Reset Success'), this.translate.instant('Need to restart the app'));
      })
      .catch(err => {
        this.tipsService.alert(this.translate.instant('Reset Failed'), null);
      });
  }
}
