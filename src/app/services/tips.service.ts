import { Injectable } from '@angular/core';
import { ModalController, Events } from '@ionic/angular';

import { NGXLogger } from 'ngx-logger';

import { TipsPage } from '../modal/tips/tips.page';
import { modalAlertEnter, modalAlertLeave } from '../modal/modal.style';

@Injectable({
  providedIn: 'root'
})
export class TipsService {
  constructor(private modalController: ModalController) {}

  async alert(result, message) {
    const modal = await this.modalController.create({
      component: TipsPage,
      enterAnimation: modalAlertEnter,
      leaveAnimation: modalAlertLeave,
      showBackdrop: true,
      backdropDismiss: true,
      componentProps: {
        message: message,
        result: result
      }
    });
    return await modal.present();
  }
}
