import { Component, OnInit } from '@angular/core';
import { modalAlertEnter, modalAlertLeave } from '../../modal/modal.style';
import { MnemonicPage } from '../../modal/mnemonic/mnemonic.page';
import { ModalController, LoadingController, Events } from '@ionic/angular';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss']
})
export class SettingPage implements OnInit {
  constructor(private modalController: ModalController) {}

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
}
