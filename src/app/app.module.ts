import { NgModule } from '@angular/core';
import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';

import { RouteReuseStrategy } from '@angular/router';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { IonicStorageModule } from '@ionic/storage';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslatePoHttpLoader } from '@biesbjerg/ngx-translate-po-http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Toast } from '@ionic-native/toast/ngx';

// Services
import { ProfileService } from './services/profile.service';
import { JSApiService } from './services/jsapi.service';
import { IonicGestureConfig } from './services/gesture.service';
// Components
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
// modal
import { PaymentPage } from './modal/payment/payment.page';
import { TipsPage } from './modal/tips/tips.page';
import { MnemonicPage } from './modal/mnemonic/mnemonic.page';
// Clipboard
import { Clipboard } from '@ionic-native/clipboard/ngx';

export function createTranslateLoader(http: HttpClient) {
  return new TranslatePoHttpLoader(http, '../assets/i18n/po', '.po');
}

@NgModule({
  declarations: [AppComponent, PaymentPage, TipsPage, MnemonicPage],
  entryComponents: [PaymentPage, TipsPage, MnemonicPage],
  imports: [
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),

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
    Toast,
    Clipboard,
    ProfileService,
    JSApiService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: IonicGestureConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
