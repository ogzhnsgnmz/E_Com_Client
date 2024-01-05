import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  private language: string = 'tr';

  constructor(private translate: TranslateService) {
  }

  setDefaultLanguage() {
    this.translate.use(this.language);
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }
}