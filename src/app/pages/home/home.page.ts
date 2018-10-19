import { Component, OnInit } from "@angular/core";
import { NGXLogger } from "ngx-logger";

@Component({
  selector: "app-home",
  templateUrl: "./home.page.html",
  styleUrls: ["./home.page.scss"]
})
export class HomePage implements OnInit {
  constructor(private logger: NGXLogger) {}

  ngOnInit() {
    this.logger.debug("homepage");
  }
}
