import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PaymentService } from '../../services/payment.service';

@Component({
  selector: 'app-examples',
  templateUrl: './examples.page.html',
  styleUrls: ['./examples.page.scss']
})
export class ExamplesPage implements OnInit {
  obj: any = {
    url: 'http://150.109.57.242/demo/readbook',
    title: '小王子',
    msg: '附加信息'
  };
  constructor(private router: Router, private paymentService: PaymentService) {}

  ngOnInit() {}

  // 返回 主页
  goBack() {
    this.router.navigate(['/home']);
  }
  // 打开 浏览器
  openOnBrowser() {
    this.router.navigate(['/browser'], { queryParams: this.obj });
  }
  // 点击 付款
  presentModal() {
    this.paymentService.confirmPay('KPQ3CRPBG5FSKVEH6Y76ETGD5D2N7QZ7', 123, 'TTT', 'hello');
  }
}
