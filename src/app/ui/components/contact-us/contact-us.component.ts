import { Component } from '@angular/core';
import { JsonService } from 'src/app/services/common/json.service';
import { LanguageService } from 'src/app/services/common/language.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent {

  constructor(private languageService: LanguageService) {
    this.languageService.setLanguage();
  }

}
