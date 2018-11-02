import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faucet',
  templateUrl: './faucet.page.html',
  styleUrls: ['./faucet.page.scss']
})
export class FaucetPage implements OnInit {
  constructor() {}

  ngOnInit() {}
  goBack() {
    history.go(-1);
  }
}
