import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsModule } from './products/products.module';
import { LoginModule } from './login/login.module';
import { RegisterModule } from './register/register.module';
import { BasketsModule } from './baskets/baskets.module';
import { PasswordResetModule } from './password-reset/password-reset.module';
import { UpdatePasswordModule } from './update-password/update-password.module';
import { AboutUsModule } from './about-us/about-us.module';
import { HomeModule } from './home/home.module';
import { ProductDetailModule } from './product-detail/product-detail.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ProductsModule,
    LoginModule,
    RegisterModule,
    BasketsModule,
    PasswordResetModule,
    UpdatePasswordModule,
    AboutUsModule,
    HomeModule,
    ProductDetailModule
  ],
  exports: [
    BasketsModule
  ]
})
export class ComponentsModule { }
