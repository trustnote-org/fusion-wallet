import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss']
})
export class PaymentPage implements OnInit {
  constructor(private navParams: NavParams, private modalController: ModalController) {}

  ngOnInit() {}

  // 关闭模态框
  closeModal() {
    this.modalController.dismiss();
  }
}
