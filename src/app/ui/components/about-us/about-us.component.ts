import { Component } from '@angular/core';
import { LanguageService } from 'src/app/services/common/language.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent {

  constructor(private languageService: LanguageService) {
    this.languageService.setLanguage();
  }
  
}
