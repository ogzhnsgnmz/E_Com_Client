import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'src/app/services/common/auth.service';
import { CustomToastrService, TaostrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';
import { AppComponent } from 'src/app/app.component';
import { LanguageService } from 'src/app/services/common/language.service';
import { filter } from 'rxjs';

declare var $: any

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  currentPath: string;
  pathSegments: string[];

  constructor(public authService: AuthService, 
    private toastrService: CustomToastrService, 
    private router: Router, 
    private appComponent: AppComponent,
    private languageService: LanguageService) {
    authService.identityCheck();
    this.languageService.setLanguage('tr');
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentPath = event.urlAfterRedirects;
        this.pathSegments = this.currentPath.split('/');
      });
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

  callLoadComponent() {
    this.appComponent.loadComponent();
  }
}
