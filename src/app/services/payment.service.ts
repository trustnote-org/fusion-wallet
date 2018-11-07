import { Injectable } from '@angular/core';
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
                  this.logger.error(error);
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
          this.logger.error(error);
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

    let ret = await this.pay(outputs, asset, message);
    this.logger.debug(ret);
  }

  async confirmPay(address, amount, asset, msg) {
    const modal = await this.modalController.create({
      component: PaymentPage,
      leaveAnimation: this.customLeaveAnimation,
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

  customLeaveAnimation(AnimationC, baseEl) {
    const baseAnimation = new AnimationC();
    const backdropAnimation = new AnimationC();
    backdropAnimation.addElement(baseEl.querySelector('ion-backdrop'));
    const wrapperAnimation = new AnimationC();
    wrapperAnimation.addElement(baseEl.querySelector('.paymentModal'));
    backdropAnimation.fromTo('opacity', 0.5, 0);
    wrapperAnimation.fromTo('translateY', '0%', '100%');
    const ani = baseAnimation
      .addElement(baseEl)
      .easing('cubic-bezier(.36,.66,.04,1)')
      .duration(250)
      .add(backdropAnimation)
      .add(wrapperAnimation);
    return Promise.resolve(ani);
  }

  // payMutiAddress()
}
