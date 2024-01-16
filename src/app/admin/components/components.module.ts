import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsModule } from './products/products.module';
import { CustomerModule } from './customer/customer.module';
import { UserModule } from './user/user.module';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    ProductsModule,
    CustomerModule,
    UserModule
  ]
})
export class ComponentsModule { }
