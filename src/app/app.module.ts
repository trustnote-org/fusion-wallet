import { NgModule } from '@angular/core';
import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';

import { RouteReuseStrategy } from '@angular/router';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { IonicStorageModule } from '@ionic/storage';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslatePoHttpLoader } from '@biesbjerg/ngx-translate-po-http-loader';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

// Services
import { ProfileService } from './services/profile.service';
// Components
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
// gestures
import { IonicGestureConfig } from './services/gesture.service';
import { PaymentPage } from './modal/payment/payment.page';

export function createTranslateLoader(http: HttpClient) {
  return new TranslatePoHttpLoader(http, '../assets/i18n', '.po');
}

@NgModule({
  declarations: [AppComponent, PaymentPage],
  entryComponents: [PaymentPage],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    IonicStorageModule.forRoot({
      name: '__utw',
      driverOrder: ['sqlite', 'indexeddb', 'websql']
    }),
    LoggerModule.forRoot({
      level: NgxLoggerLevel.TRACE
    })
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ProfileService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: IonicGestureConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
