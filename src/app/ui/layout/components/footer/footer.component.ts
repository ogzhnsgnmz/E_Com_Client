import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component } from '@angular/core';
import { JqueryService } from 'src/app/services/common/jquery.service';
import { JsonService } from 'src/app/services/common/json.service';
import { LanguageService } from 'src/app/services/common/language.service';

declare var $: any

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements AfterViewInit {

  jsonData: any;

  constructor(
    private jsonService: JsonService,
    private jqueryService: JqueryService) {
  }
  
  async ngAfterViewInit(){
    this.jqueryService.ngAfterViewInit();
  }
  
  async ngOnInit() {
    this.jsonData = await this.jsonService.getjson();
  }
}
