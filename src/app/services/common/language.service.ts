import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('en');
  }

  setLanguage() {
    this.translate.use('tr');
  }
}