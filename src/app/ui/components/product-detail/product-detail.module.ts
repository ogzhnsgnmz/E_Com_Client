import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDetailComponent } from './product-detail.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    ProductDetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path:"", component: ProductDetailComponent}
    ])
  ]
})
export class ProductDetailModule { }
