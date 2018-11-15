import { Injectable } from '@angular/core';
import { ModalController, LoadingController } from '@ionic/angular';

import { TipsPage } from '../modal/tips/tips.page';
import { modalAlertEnter, modalAlertLeave } from '../modal/modal.style';

@Injectable({
  providedIn: 'root'
})
export class TipsService {
  constructor(private modalController: ModalController, public loadingController: LoadingController) {}

  async loading(message?: string) {
    const loading = await this.loadingController.create({
      message: message,
      duration: 60000
    });
    return await loading.present();
  }

  async alert(title, message) {
    const modal = await this.modalController.create({
      component: TipsPage,
      enterAnimation: modalAlertEnter,
      leaveAnimation: modalAlertLeave,
      showBackdrop: true,
      backdropDismiss: true,
      componentProps: {
        title: title,
        message: message
      }
    });
    this.loadingController.dismiss();
    return await modal.present();
  }
}
