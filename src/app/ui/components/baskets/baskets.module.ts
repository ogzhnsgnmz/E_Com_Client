import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasketsComponent } from './baskets.component';
import { RouterModule } from '@angular/router';
import { DynamicLoadComponentDirective } from 'src/app/directives/common/dynamic-load-component.directive';



@NgModule({
  declarations: [
    BasketsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path:"", component: BasketsComponent}
    ])
  ],
  exports: [
    BasketsComponent
  ]
})
export class BasketsModule { }
