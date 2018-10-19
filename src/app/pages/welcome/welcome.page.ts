import { Component, OnInit } from "@angular/core";

// 引入 Router
import { Router } from "@angular/router";

@Component({
  selector: "app-welcome",
  templateUrl: "./welcome.page.html",
  styleUrls: ["./welcome.page.scss"]
})
export class WelcomePage implements OnInit {
  constructor(private route: Router) {} // 初始化 Router

  ngOnInit() {}

  goWallet() {
    // console.log('nihao');
    // this.navCtrl.push(home);
    this.route.navigate(["/home"]);
  }
}
