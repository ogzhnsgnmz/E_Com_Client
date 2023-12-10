import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeModule } from './home/home.module';
import { ProductsModule } from './products/products.module';
import { LoginModule } from './login/login.module';
import { RegisterModule } from './register/register.module';
import { BasketsModule } from './baskets/baskets.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HomeModule,
    ProductsModule,
    LoginModule,
    RegisterModule
  ],
  exports: [
    BasketsModule
  ]
})
export class ComponentsModule { }
