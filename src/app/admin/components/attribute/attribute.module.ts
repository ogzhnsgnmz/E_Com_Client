import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttributeComponent } from './attribute.component';
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DeleteDirectiveModule } from 'src/app/directives/admin/delete.directive.module';



@NgModule({
  declarations: [
    AttributeComponent,
    CreateComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: "", component: AttributeComponent }
    ]),
    MatSidenavModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatTableModule, MatPaginatorModule,
    DeleteDirectiveModule
  ]
})
export class AttributeModule { }
