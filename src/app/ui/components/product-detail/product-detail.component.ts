import { Component, OnInit } from '@angular/core';
import { BaseUrl } from 'src/app/contracts/base_url';
import { JqueryService } from 'src/app/services/common/jquery.service';
import { LanguageService } from 'src/app/services/common/language.service';
import { ProductAttributeService } from 'src/app/services/common/models/product-attribute.service';
import { ProductService } from 'src/app/services/common/models/product.service';

declare var $: any;

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  productId: string;
  product: any;
  productImage: any;
  baseUrl: BaseUrl;
  productAttribute: any;

  constructor(
    private productService: ProductService,
    private jqueryService: JqueryService,
    private productAttributeService: ProductAttributeService) {
  }

  range(count: number): number[] {
    return Array.from({ length: count }, (value, index) => index);
  }

  ngOnInit() {
    const currentUrl = window.location.href;
    const urlParts = currentUrl.split('/');
    this.productId = urlParts[urlParts.length - 1];
    this.getProductAttribute();
    this.getProductImage();
    this.getProduct();
    this.jqueryService.ngAfterViewInit();
  }

  async getProduct() {
    this.product = await this.productService.readById(this.productId,null,null,null);
  }

  async getProductImage(){
    this.productImage = await this.productService.readImage(this.productId);
  }

  async getProductAttribute(){
    this.productAttribute = await this.productAttributeService.getProductIdAttributes(this.productId, 0, 0);
    console.log("");
  }
}