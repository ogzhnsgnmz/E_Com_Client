import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { List_Product } from 'src/app/contracts/list_product';
import { AuthService } from 'src/app/services/common/auth.service';
import { JqueryService } from 'src/app/services/common/jquery.service';
import { JsonService } from 'src/app/services/common/json.service';
import { LanguageService } from 'src/app/services/common/language.service';
import { CategoryService } from 'src/app/services/common/models/category.service';
import { ProductService } from 'src/app/services/common/models/product.service';
import { CustomToastrService, TaostrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';

declare var $: any

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit, AfterViewInit {
  products: List_Product[];
  categories: any;
  jsonData: any;

  constructor(public authService: AuthService, 
    private toastrService: CustomToastrService, 
    private router: Router, 
    private appComponent: AppComponent,
    private languageService: LanguageService,
    private jqueryService: JqueryService,
    private productService: ProductService,
    private categoryService: CategoryService,
    private httpClient: HttpClient,
    private jsonService: JsonService) { 
      this.languageService.setDefaultLanguage();
  }

  setLanguage(language: string) {
    this.languageService.useLanguage(language);
  }

  async ngAfterViewInit(){
    this.jqueryService.ngAfterViewInit();
  }

  async ngOnInit() {
    const data: {totalProductCount: number, products: List_Product[]} = await this.productService.read(null,0,6,null,()=>{},errorMessage => {});
    this.products = data.products;
    this.getCategories();
    this.jsonData = await this.jsonService.getjson();
  }

  async getCategories(){
    this.categories = await this.categoryService.getAllCategories(0, 20);
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
