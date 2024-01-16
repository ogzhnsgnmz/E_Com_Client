import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsModule } from './products/products.module';
import { LoginModule } from './login/login.module';
import { RegisterModule } from './register/register.module';
import { BasketsModule } from './baskets/baskets.module';
import { PasswordResetModule } from './password-reset/password-reset.module';
import { UpdatePasswordModule } from './update-password/update-password.module';
import { AboutModule } from './about/about.module';
import { HomeModule } from './home/home.module';
import { ProductDetailModule } from './product-detail/product-detail.module';
import { ContactModule } from './contact/contact.module';
import { PreinformationComponent } from './preinformation/preinformation.component';



@NgModule({
  declarations: [
    PreinformationComponent
  ],
  imports: [
    CommonModule,
    ProductsModule,
    LoginModule,
    RegisterModule,
    BasketsModule,
    PasswordResetModule,
    UpdatePasswordModule,
    ContactModule,
    AboutModule,
    HomeModule,
    ProductDetailModule
  ],
  exports: [
    BasketsModule
  ]
})
export class ComponentsModule { }
