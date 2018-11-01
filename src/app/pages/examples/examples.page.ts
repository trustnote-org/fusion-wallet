import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-examples',
  templateUrl: './examples.page.html',
  styleUrls: ['./examples.page.scss']
})
export class ExamplesPage implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  goBack() {
    // history.go(-1);
    this.router.navigate(['/home']);
  }
  openOnBrowser() {
    this.router.navigate(['/browser']);
  }
}
