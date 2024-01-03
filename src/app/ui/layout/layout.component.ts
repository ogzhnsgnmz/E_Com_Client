import { Component, ElementRef, OnInit } from '@angular/core';
import { JqueryService } from 'src/app/services/common/jquery.service';
import { LanguageService } from 'src/app/services/common/language.service';

declare var $: any;

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  constructor(private el: ElementRef,
	private languageService: LanguageService,
	private jqueryService: JqueryService) {
  }

  ngOnInit() {
    this.jqueryService.ngAfterViewInit();
	this.languageService.setLanguage();
  }
}
