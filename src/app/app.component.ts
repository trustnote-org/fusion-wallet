import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { NGXLogger } from 'ngx-logger';

import { ProfileService } from './services/profile.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private profileService: ProfileService,
    private logger: NGXLogger,
    private route: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.profileService
      .loadProfile()
      .then(profile => {
        if (profile.status && profile.status.wallet) {
          this.profileService.profile = profile;
          this.route.navigate(['/home']);
        } else {
          this.route.navigate(['/welcome']);
          this.profileService.storeProfile(this.profileService.profile).catch(err => {
            this.logger.debug(err);
          });
        }
      })
      .catch(err => {
        this.logger.debug(err);
      });

    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
