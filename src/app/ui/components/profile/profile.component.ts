import { Component } from '@angular/core';
import { LanguageService } from 'src/app/services/common/language.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  constructor(private languageService: LanguageService) {
    this.languageService.setDefaultLanguage();
  }
}
