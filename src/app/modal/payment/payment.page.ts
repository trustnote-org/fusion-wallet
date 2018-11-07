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
  address: string;
  @Input()
  amount: number;
  @Input()
  asset: string;
  @Input()
  message: string;

  constructor(
    public events: Events,
    private modalController: ModalController,
    private logger: NGXLogger
  ) {}

  ngOnInit() {
    this.logger.debug(this.address, this.amount, this.asset, this.message);
  }

  // 关闭模态框
  closeModal() {
    this.modalController.dismiss();
  }

  open() {
    this.events.publish('payment', this.address, this.amount, this.asset, this.message);
  }
}