import { Component } from '@angular/core';
import { JqueryService } from 'src/app/services/common/jquery.service';
import { LanguageService } from 'src/app/services/common/language.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent {

  constructor(private languageService: LanguageService,
    private jqueryService: JqueryService) {
      this.languageService.setDefaultLanguage();
  }

  async ngAfterViewInit(){
    this.jqueryService.ngAfterViewInit();
  }

}
