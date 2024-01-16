import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreinformationComponent } from './preinformation.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path:"", component: PreinformationComponent}
    ])
  ]
})
export class PreinformationModule { }
