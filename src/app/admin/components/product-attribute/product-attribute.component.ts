import { Component, OnInit, ViewChild } from '@angular/core';
import { ListComponent } from './list/list.component';

@Component({
  selector: 'app-product-attribute',
  templateUrl: './product-attribute.component.html',
  styleUrls: ['./product-attribute.component.scss']
})
export class ProductAttributeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @ViewChild(ListComponent) listComponents: ListComponent;

  createdSize(createdSize: string) {
    this.listComponents.getAttributes();
  }
}
