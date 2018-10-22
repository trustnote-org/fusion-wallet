import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NGXLogger } from 'ngx-logger';
import { ProfileService } from './profile.service';

import _ from "lodash";

@Injectable({
  providedIn: 'root',
})

export class LanguageService {
  private languages = [
    {
      name: "English",
      isoCode: "en"
    },
    {
      name: "中文",
      isoCode: "zh",
      useIdeograms: true
    }
  ];

  private current: string;

  constructor(
    private translate: TranslateService,
    private profile: ProfileService,
    private logger: NGXLogger
  ) {
    this.logger.debug("LanguageService initialized.");
    this.translate.onLangChange.subscribe(event => {
      this.logger.info("Setting new default language to: " + event.lang);
    });
  }

  get currentLanguage() {
    return this.current;
  }

  get defaultLanguage() {
    return this.languages[0]["isoCode"];
  }

  get availableLanguage() {
    return this.languages;
  }

  public getName(lang: string): string {
    return _.result(
      _.find(this.languages, {
        isoCode: lang
      }),
      "name"
    );
  }

  public load(): string {
    let lang = this.profile.setting.language;
    if (!_.isEmpty(lang)) this.current = lang;
    else {
      const browserLang = this.translate.getBrowserLang();
      this.current = this.getName(browserLang) ? browserLang : this.defaultLanguage;
    }
    this.logger.info("Default language: " + this.current);
    this.translate.setDefaultLang(this.current);
    return this.current;
  }

  public set(lang: string): void {
    this.current = lang;
    this.translate.use(lang);
    let setting = this.profile.setting;
    setting.language = lang;
    this.profile.storeSetting(setting);
  }
}
