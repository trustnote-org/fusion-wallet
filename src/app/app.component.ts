import { Component, ViewChild } from '@angular/core';
import { Platform, IonRouterOutlet } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { NGXLogger } from 'ngx-logger';
import { Toast } from '@ionic-native/toast/ngx';

import { ProfileService } from './services/profile.service';
import { LanguageService } from './services/language.service';
import { JSApiService } from './services/jsapi.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  @ViewChild(IonRouterOutlet) routerOutlet: IonRouterOutlet;

  // set up hardware back button event.
  lastTimeBackPress = 0;
  timePeriodToExit = 2000;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private profileService: ProfileService,
    private jsapi: JSApiService,
    private languageService: LanguageService,
    private logger: NGXLogger,
    private toast: Toast,
    private router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.profileService
      .loadProfile()
      .then(profile => {
        if (profile.status && profile.status.wallet) {
          this.profileService.profile = profile;
          this.router.navigate(['/home']);
        } else {
          this.router.navigate(['/welcome']);
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
      this.backButtonEvent();
    });
  }

  // active hardware back button
  backButtonEvent() {
    this.platform.backButton.subscribe(() => {
      if (this.router.url === '/home' || this.router.url === '/') {
        if (new Date().getTime() - this.lastTimeBackPress < this.timePeriodToExit) {
          navigator['app'].exitApp(); // work in ionic 4
        } else {
          this.toast.show(`Press back again to exit App.`, '2000', 'bottom').subscribe(toast => {});
          this.lastTimeBackPress = new Date().getTime();
        }
      }
    });
  }
}
