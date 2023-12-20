import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdatePasswordComponent } from './update-password.component';
import { RouterModule } from '@angular/router';
import { LoginComponent } from '../login/login.component';



@NgModule({
  declarations: [
    UpdatePasswordComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path:"", component: UpdatePasswordComponent}
    ])
  ]
})
export class UpdatePasswordModule { }
