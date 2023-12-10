import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from 'src/app/base/base/base.component';
import { Create_Product } from 'src/app/contracts/create_product';
import { HttpClientService } from 'src/app/services/common/http-client.service';
import { ListComponent } from './list/list.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
  })
  export class ProductsComponent extends BaseComponent implements OnInit {
    constructor(spinner: NgxSpinnerService, private httpClientService: HttpClientService) { 
      super(spinner)
    }
  
    @ViewChild(ListComponent) listComponents: ListComponent;
    
    createdProduct(createdProduct: Create_Product) {
      this.listComponents.getProducts();
    }
  
    ngOnInit(): void {
      /*
      this.httpClientService.get<Product[]>({
        controller: "Products"
      }).subscribe(data=>console.log(data));
      
      this.httpClientService.post({
        controller: "Products"
      },{
        name: "Deneme",
        code: "deneme",
        theoric: "deneme",
        practical: "deneme",
        akts: "deneme"
      }).subscribe();
      
      this.httpClientService.post({
        controller: "Products"
      },{
        name: "Deneme",
        code: "deneme",
        theoric: "deneme",
        practical: "deneme",
        akts: "deneme"
      }).subscribe();*/
    }
  }