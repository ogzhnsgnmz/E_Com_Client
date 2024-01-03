import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { JsonService } from 'src/app/services/common/json.service';
import { LanguageService } from 'src/app/services/common/language.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  jsonData: any;

  constructor(private languageService: LanguageService,
    private httpClient: HttpClient,
    private jsonService: JsonService) {
    this.languageService.setLanguage();
  }
  
  async ngOnInit() {
    this.jsonData = await this.jsonService.getjson();
  }
}
