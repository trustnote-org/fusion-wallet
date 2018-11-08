import { Component, OnInit, Input } from '@angular/core';
import { ModalController, Events } from '@ionic/angular';

import { NGXLogger } from 'ngx-logger';

@Component({
  selector: 'app-tips',
  templateUrl: './tips.page.html',
  styleUrls: ['./tips.page.scss']
})
export class TipsPage implements OnInit {
  @Input()
  result: any;
  @Input()
  message: any;

  constructor(
    public events: Events,
    private modalController: ModalController,
    private logger: NGXLogger
  ) {}

  ngOnInit() {
    this.logger.debug(this.result, this.message);
    if (this.message && this.message.match('not enough asset')) {
      this.message = '余额不足';
    }
  }

  // 关闭模态框
  closeModal() {
    this.modalController.dismiss();
  }
}
