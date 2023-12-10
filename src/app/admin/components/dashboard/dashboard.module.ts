import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterModule } from '@angular/router';
import { FileUploadModule } from 'src/app/services/common/file-upload/file-upload.module';



@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path:"", component: DashboardComponent}
    ]),
    FileUploadModule
  ]
})
export class DashboardModule { }
