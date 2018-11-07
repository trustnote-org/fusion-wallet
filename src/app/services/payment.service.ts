import { Injectable } from '@angular/core';
import { Animation } from '@ionic/core';
import { ModalController, Events } from '@ionic/angular';

import { NGXLogger } from 'ngx-logger';
import { NetworkService } from './network.service';
import { WalletService } from './wallet.service';
import { ProfileService } from './profile.service';

import { PaymentPage } from '../modal/payment/payment.page';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  constructor(
    public events: Events,
    private modalController: ModalController,
    private logger: NGXLogger,
    private networkService: NetworkService,
    private walletService: WalletService,
    private profileService: ProfileService
  ) {
    this.events.subscribe('payment', (address, amount, asset, msg) => {
      this.logger.debug('evnets: payment', address, amount, asset, msg);
      this.paySingleAddress(address, amount, asset, msg);
    });
  }

  pay(outputs, asset, message) {
    return new Promise((resolve, reject) => {
      let transData = {
        asset: asset,
        message: message,
        payer: this.profileService.wallet.address,
        outputs: outputs
      };

      this.networkService.transfer(transData).subscribe(
        response => {
          this.logger.debug(response);
          let textToSign = response.data.b64_to_sign;
          let txid = response.data.txid;

          this.walletService
            .sign(textToSign, this.profileService.wallet.privkey)
            .then(sig => {
              let sigData = {
                txid: txid,
                sig: sig
              };
              this.logger.debug('sign result: ', sigData);
              this.networkService.submitSig(sigData).subscribe(
                res => {
                  this.logger.debug('payment result:', res);
                  resolve(res);
                },
                error => {
                  reject(error);
                  return;
                }
              );
            })
            .catch(err => {
              reject(err);
              return;
            });
        },
        error => {
          reject(error);
          return;
        }
      );
    });
  }

  async paySingleAddress(address, amount, asset, message) {
    let outputs = [
      {
        address: address,
        amount: amount
      }
    ];

    try {
      let ret = await this.pay(outputs, asset, message);
      this.logger.debug(ret);
    } catch (error) {
      this.logger.error(error);
    }
  }

  async confirmPay(address, amount, asset, msg) {
    const modal = await this.modalController.create({
      component: PaymentPage,
      enterAnimation: this.modalAlertEnter,
      leaveAnimation: this.modalAlertLeave,
      showBackdrop: true,
      backdropDismiss: true,
      componentProps: {
        paymentInfo: {
          address: address,
          amount: amount,
          asset: asset,
          message: msg
        }
      }
    });
    return await modal.present();
  }

  modalAlertEnter(AnimationC: Animation, baseEl: HTMLElement): Promise<Animation> {
    const baseAnimation = new AnimationC();

    const backdropAnimation = new AnimationC();
    backdropAnimation.addElement(baseEl.querySelector('ion-backdrop'));

    const wrapperAnimation = new AnimationC();
    wrapperAnimation.addElement(baseEl.querySelector('.modal-wrapper'));

    wrapperAnimation
      .beforeStyles({ opacity: 1, transform: 'none' })
      .fromTo('opacity', 0.01, 1)
      .fromTo('scale', '1.1', '1');

    backdropAnimation.fromTo('opacity', 0.01, 0.3);

    return Promise.resolve(
      baseAnimation
        .addElement(baseEl)
        .easing('cubic-bezier(0.36,0.66,0.04,1)')
        .duration(200)
        .beforeAddClass('show-modal')
        .add(backdropAnimation)
        .add(wrapperAnimation)
    );
  }

  modalAlertLeave(AnimationC: Animation, baseEl: HTMLElement): Promise<Animation> {
    const baseAnimation = new AnimationC();

    const backdropAnimation = new AnimationC();
    backdropAnimation.addElement(baseEl.querySelector('ion-backdrop'));

    const wrapperAnimation = new AnimationC();
    const wrapperEl = baseEl.querySelector('.modal-wrapper');
    wrapperAnimation.addElement(wrapperEl);
    // const wrapperElRect = wrapperEl!.getBoundingClientRect();

    wrapperAnimation
      .beforeStyles({ translateY: 0 })
      .fromTo('opacity', 0.99, 0)
      .fromTo('scale', 1, 0.9);

    backdropAnimation.fromTo('opacity', 0.3, 0.0);

    return Promise.resolve(
      baseAnimation
        .addElement(baseEl)
        .easing('ease-out')
        .duration(200)
        .add(backdropAnimation)
        .add(wrapperAnimation)
    );
  }

  // payMutiAddress()
}
