import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController, Events } from '@ionic/angular';

import { NGXLogger } from 'ngx-logger';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss']
})
export class PaymentPage implements OnInit {
  params: any;

  constructor(
    public events: Events,
    private navParams: NavParams,
    private modalController: ModalController,
    private logger: NGXLogger
  ) {
    this.params = this.navParams.data;
    this.logger.debug(this.params);
  }

  ngOnInit() {}

  // 关闭模态框
  closeModal() {
    this.modalController.dismiss();
  }

  open() {
    this.events.publish(
      'payment',
      this.params.address,
      this.params.amount,
      this.params.asset,
      this.params.message
    );
  }
}
