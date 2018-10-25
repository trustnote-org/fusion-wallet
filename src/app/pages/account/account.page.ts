import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }


  // 点击返回
  goBack(){
    history.go(-1);
  }
}
