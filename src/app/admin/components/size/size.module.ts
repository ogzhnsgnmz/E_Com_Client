import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SizeComponent } from './size.component';
import { CreateComponent } from './create/create.component';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DeleteDirectiveModule } from 'src/app/directives/admin/delete.directive.module';
import { ListComponent } from './list/list.component';



@NgModule({
  declarations: [
    SizeComponent,
    CreateComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: "", component: SizeComponent }
    ]),
    MatSidenavModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatTableModule, MatPaginatorModule,
    DeleteDirectiveModule
  ]
})
export class SizeModule { }