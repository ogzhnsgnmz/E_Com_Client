import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutComponent } from './checkout.component';
import { RouterModule } from '@angular/router';
import { ContactUsComponent } from '../contact-us/contact-us.component';



@NgModule({
  declarations: [
    CheckoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path:"", component: CheckoutComponent}
    ])
  ]
})
export class CheckoutModule { }
