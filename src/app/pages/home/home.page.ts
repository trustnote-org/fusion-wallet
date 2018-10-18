import { Component, OnInit } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private logger: NGXLogger, private storage: StorageService) { }

  ngOnInit() {
    this.logger.debug("homepage");
  }
}
