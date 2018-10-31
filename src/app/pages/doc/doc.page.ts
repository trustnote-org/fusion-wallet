import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-doc',
  templateUrl: './doc.page.html',
  styleUrls: ['./doc.page.scss']
})
export class DocPage implements OnInit {
  constructor() {}

  ngOnInit() {}

  goBack() {
    history.go(-1);
  }
}
