import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

import { modalAlertEnter, modalAlertLeave } from '../../modal/modal.style';
import { MnemonicPage } from '../../modal/mnemonic/mnemonic.page';

import { ProfileService } from '../../services/profile.service';
import { TipsService } from '../../services/tips.service';
import { AlertController } from '@ionic/angular';
import { NGXLogger } from 'ngx-logger';

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
    private tipsService: TipsService,
    private alertController: AlertController,
    private logger: NGXLogger
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

  // 重置钱包
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

  // 确定框 是否重置钱包
  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: this.translate.instant('Note'),
      message: this.translate.instant('Beware, everything will be reset'),
      buttons: [
        {
          text: this.translate.instant('Cancel'),
          role: 'cancel',
          cssClass: 'secondary',
          handler: blah => {
            this.logger.info('Confirm Cancel Clicked');
          }
        },
        {
          text: this.translate.instant('Ok'),
          handler: () => {
            this.logger.info('Confirm Ok Clicked');
            this.resetWallet();
          }
        }
      ]
    });

    await alert.present();
  }
}
