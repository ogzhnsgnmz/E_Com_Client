import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { List_Product } from 'src/app/contracts/list_product';
import { AuthService } from 'src/app/services/common/auth.service';
import { JqueryService } from 'src/app/services/common/jquery.service';
import { LanguageService } from 'src/app/services/common/language.service';
import { ProductService } from 'src/app/services/common/models/product.service';
import { CustomToastrService, TaostrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  products: List_Product[];
  constructor(public authService: AuthService, 
    private toastrService: CustomToastrService, 
    private router: Router, 
    private appComponent: AppComponent,
    private languageService: LanguageService,
    private jqueryService: JqueryService,
    private productService: ProductService) {
    this.languageService.setLanguage('tr');
  }
  async ngOnInit() {
    this.jqueryService.ngAfterViewInit();
    const data: {totalProductCount: number, products: List_Product[]} = await this.productService.read(0,6,
      ()=>{

      },
      errorMessage => {

      });
      this.products = data.products;
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
