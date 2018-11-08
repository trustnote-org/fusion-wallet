import { Component, OnInit, Input } from '@angular/core';
import { ModalController, Events } from '@ionic/angular';

import { NGXLogger } from 'ngx-logger';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss']
})
export class PaymentPage implements OnInit {
  @Input()
  paymentInfo: any;
  amount: number;

  constructor(
    public events: Events,
    private modalController: ModalController,
    private logger: NGXLogger
  ) {}

  ngOnInit() {
    this.logger.debug(this.paymentInfo);
    this.amount = this.paymentInfo.amount / 1000000;
  }

  // 关闭模态框
  closeModal() {
    this.modalController.dismiss();
  }

  pay() {
    this.events.publish(
      'payment',
      this.paymentInfo.address,
      this.paymentInfo.amount,
      this.paymentInfo.asset,
      this.paymentInfo.message
    );
    this.modalController.dismiss();
  }
}
