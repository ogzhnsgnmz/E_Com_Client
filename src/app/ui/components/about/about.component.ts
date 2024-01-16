import { AfterViewInit, Component } from '@angular/core';
import { JqueryService } from 'src/app/services/common/jquery.service';
import { LanguageService } from 'src/app/services/common/language.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements AfterViewInit {

  constructor(private jqueryService: JqueryService) {
  }

  async ngAfterViewInit(){
    this.jqueryService.ngAfterViewInit();
  }
}
