import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-miniapp',
  templateUrl: './miniapp.page.html',
  styleUrls: ['./miniapp.page.scss'],
})
export class MiniappPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  goBack() {
    this.router.navigate(['/home']);
  }
}
