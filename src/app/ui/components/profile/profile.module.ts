import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { RouterModule } from '@angular/router';
import { ProductDetailComponent } from '../product-detail/product-detail.component';



@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path:"", component: ProfileComponent}
    ])
  ]
})
export class ProfileModule { }
