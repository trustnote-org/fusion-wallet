import { Component, OnInit } from "@angular/core";
import { NGXLogger } from "ngx-logger";

import { Router } from "@angular/router";
import { WalletService } from "../../services/wallet.service";
import { AlertController } from "@ionic/angular";
import { ProfileService } from "../../services/profile.service";

@Component({
  selector: "app-welcome",
  templateUrl: "./welcome.page.html",
  styleUrls: ["./welcome.page.scss"]
})
export class WelcomePage implements OnInit {
  constructor(
    private route: Router,
    private wallet: WalletService,
    private alertController: AlertController,
    private NGXLogger: NGXLogger,
    private ProfileService: ProfileService
  ) {} // 初始化 Router

  ngOnInit() {}

  //  输入密码创建钱包 并进入主页
  async presentAlertPrompt() {
    const alert = await this.alertController.create({
      header: "请输入密码",
      inputs: [
        {
          name: "pass1",
          type: "text",
          placeholder: "请输入密码"
        },
        {
          name: "pass2",
          type: "text",
          placeholder: "再一次输入密码"
        }
      ],
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "secondary",
          handler: () => {
            this.NGXLogger.info("Confirm Cancel");
          }
        },
        {
          text: "Ok",
          handler: res => {
            this.NGXLogger.info("Confirm Ok");
            if (res.pass1 && res.pass2 && res.pass1 == res.pass2) {
              this.goWallet(res.pass1);
            } else {
              this.presentAlertPrompt();
            }
          }
        }
      ]
    });

    await alert.present();
  }

  goWallet(val) {
    this.wallet
      .createWallet(val)
      .then(res => {
        this.NGXLogger.info(res);
        this.ProfileService.storeWallet(res)
          .then(res => {
            this.NGXLogger.info("store 成功", res);
            this.route.navigate(["/home"]);
          })
          .catch(reject => {
            this.NGXLogger.info(reject);
          });
      })
      .catch(reject => {
        this.NGXLogger.info(reject);
      });
  }
}
