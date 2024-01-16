import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactComponent } from './contact.component';
import { RouterModule } from '@angular/router';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from 'src/app/app.module';
import { HttpClient } from '@angular/common/http';



@NgModule({
  declarations: [
    ContactComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    RouterModule.forChild([
      {path:"", component: ContactComponent}
    ])
  ]
})
export class ContactModule { }
