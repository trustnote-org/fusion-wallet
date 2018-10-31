import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-examples',
  templateUrl: './examples.page.html',
  styleUrls: ['./examples.page.scss']
})
export class ExamplesPage implements OnInit {
  constructor() {}

  ngOnInit() {}

  goBack() {
    history.go(-1);
  }
}
