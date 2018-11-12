import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ProfileService } from '../../services/profile.service';
import { NGXLogger } from 'ngx-logger';
import { Clipboard } from '@ionic-native/clipboard/ngx';

@Component({
  selector: 'app-mnemonic',
  templateUrl: './mnemonic.page.html',
  styleUrls: ['./mnemonic.page.scss']
})
export class MnemonicPage implements OnInit {
  mnemonic: string;
  constructor(
    private modalController: ModalController,
    private profile: ProfileService,
    private logger: NGXLogger,
    private clipboard: Clipboard
  ) {
    this.mnemonic = this.profile.wallet.mnemonic;
    this.logger.debug(this.profile.wallet.mnemonic);
  }

  ngOnInit() {}
  // 关闭模态框
  closeModal() {
    this.modalController.dismiss();
  }
  // 点击 复制助记次
  clipBoard() {
    this.clipboard.copy(this.mnemonic);
  }
}
