import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { ListComponent } from './list/list.component';
import { RouterModule } from '@angular/router';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from 'src/app/app.module';
import { HttpClient } from '@angular/common/http';



@NgModule({
  declarations: [
    ProductsComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    RouterModule.forChild([
      {path:"", component: ProductsComponent}
    ])
  ]
})
export class ProductsModule { }
