import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AboutComponent } from './about.component';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [
    AboutComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    RouterModule.forChild([
      {path:"", component: AboutComponent}
    ])
  ]
})
export class AboutModule { }
