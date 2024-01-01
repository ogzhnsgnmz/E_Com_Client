import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from './services/common/auth.service';
import { CustomToastrService, TaostrMessageType, ToastrPosition } from './services/ui/custom-toastr.service';
import { Router } from '@angular/router';
import { DynamicLoadComponentDirective } from './directives/common/dynamic-load-component.directive';
import { DynamicLoadComponentService } from './services/common/dynamic-load-component.service';
import { ComponentType } from '../app/services/common/dynamic-load-component.service';
import { LanguageService } from './services/common/language.service';

declare var $: any

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild(DynamicLoadComponentDirective, {static: true})
  dynamicLoadComponentDirective: DynamicLoadComponentDirective;

  constructor(public authService: AuthService,
    private toastrService: CustomToastrService,
    private router: Router,
    private dynamicLoadComponentService: DynamicLoadComponentService,
    private languageService: LanguageService) {
    authService.identityCheck();
  }

  ngOnInit() {
    this.languageService.setLanguage('tr');
  }

  changeLanguage(language: string) {
    this.languageService.setLanguage(language);
  }

  signOut() {
    localStorage.removeItem("accessToken");
    this.authService.identityCheck();
    this.router.navigate([""]);
    this.toastrService.message("Oturum kapatılmıştır!", "Oturum Kapatıldı", {
      messageType: TaostrMessageType.Warning,
      position: ToastrPosition.TopRight
    });
  }
  
  loadComponent() {
    this.dynamicLoadComponentService.loadComponent(ComponentType.BasketsComponent, this.dynamicLoadComponentDirective.viewContainerRef);
  }
}