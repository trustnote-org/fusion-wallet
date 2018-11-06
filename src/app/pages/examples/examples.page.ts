import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PaymentPage } from '../../modal/payment/payment.page';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-examples',
  templateUrl: './examples.page.html',
  styleUrls: ['./examples.page.scss']
})
export class ExamplesPage implements OnInit {
  constructor(private router: Router, public modalController: ModalController) {}

  ngOnInit() {}

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

  // 返回 主页
  goBack() {
    this.router.navigate(['/home']);
  }
  // 打开 浏览器
  openOnBrowser() {
    this.router.navigate(['/browser']);
  }

  // 打开 模态框
  async presentModal() {
    const modal = await this.modalController.create({
      component: PaymentPage,
      leaveAnimation: this.customLeaveAnimation,
      showBackdrop: true,
      backdropDismiss: true
      // componentProps: { value: 123 }
    });
    return await modal.present();
  }
}
