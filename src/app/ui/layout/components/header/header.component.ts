import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'src/app/services/common/auth.service';
import { CustomToastrService, TaostrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';
import { AppComponent } from 'src/app/app.component';
import { LanguageService } from 'src/app/services/common/language.service';
import { filter } from 'rxjs';
import { CategoryService } from 'src/app/services/common/models/category.service';
import { List_Category } from 'src/app/contracts/category/list_category';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { BaseComponent, Spinnertype } from 'src/app/base/base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';

declare var $: any

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent extends BaseComponent{
  currentPath: string;
  pathSegments: string[];
  categories: any;

  constructor(spinner: NgxSpinnerService,
    public authService: AuthService, 
    private toastrService: CustomToastrService, 
    private router: Router, 
    private appComponent: AppComponent,
    private languageService: LanguageService,
    private categoryService: CategoryService,
    private alertifyService: AlertifyService) {
      super(spinner)
      this.languageService.setDefaultLanguage();
      authService.identityCheck();
      this.router.events
        .pipe(filter((event) => event instanceof NavigationEnd))
        .subscribe((event: NavigationEnd) => {
          this.currentPath = event.urlAfterRedirects;
          this.pathSegments = this.currentPath.split('/');
        });
  }

  async ngOnInit(){
    this.categories = await this.categoryService.getAllCategories(0, 20);
  }

  setLanguage(language: string) {
    this.languageService.useLanguage(language);
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
