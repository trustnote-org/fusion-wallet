import { Component, OnInit } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { TranslateService } from '@ngx-translate/core';

import { Router } from '@angular/router';
import { WalletService } from '../../services/wallet.service';
import { AlertController } from '@ionic/angular';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss']
})
export class WelcomePage implements OnInit {
  constructor(
    private route: Router,
    private translate: TranslateService,
    private wallet: WalletService,
    private alertController: AlertController,
    private logger: NGXLogger,
    private profileService: ProfileService
  ) {}

  ngOnInit() {}

  //  输入密码创建钱包 并进入主页
  async presentAlertPrompt() {
    const alert = await this.alertController.create({
      header: this.translate.instant('Require Password'),
      inputs: [
        {
          name: 'password',
          type: 'number',
          placeholder: this.translate.instant('Enter Password')
        },
        {
          name: 're_password',
          type: 'number',
          placeholder: this.translate.instant('Confirm Password')
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.logger.debug('click Cancel');
          }
        },
        {
          text: 'Ok',
          handler: res => {
            this.logger.debug('click Ok');
            if (res.password && res.re_password && res.password === res.re_password) {
              this.createWallet(res.password);
            } else {
              this.presentAlertPrompt();
            }
          }
        }
      ]
    });

    await alert.present();
  }

  createWallet(password) {
    this.wallet
      .createWallet(password)
      .then(res => {
        this.logger.debug(res);
        this.profileService
          .storeWallet(res)
          .then(ret => {
            this.logger.debug('store success', ret);
            const status = this.profileService.status;
            status.wallet = true;
            this.profileService.storeStatus(status);
            this.route.navigate(['/home']);
          })
          .catch(reject => {
            this.logger.debug(reject);
          });
      })
      .catch(reject => {
        this.logger.debug(reject);
      });
  }
}
