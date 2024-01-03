import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, Spinnertype } from 'src/app/base/base/base.component';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ProductAttributeService } from 'src/app/services/common/models/product-attribute.service';
import { List_Product_Attribute } from 'src/app/contracts/product-attribute/list_product_attribute';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseComponent implements OnInit {

  productId: string;
  attributeId: any;

  constructor(spinner: NgxSpinnerService,
    private productAttributeService: ProductAttributeService,
    private alertifyService: AlertifyService) {
    super(spinner)
  }

  attributeName: any;

  displayedColumns: string[] = ['attribute', 'value', 'edit', 'delete'];
  dataSource: MatTableDataSource<List_Product_Attribute> = null;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  async getAttributes() {
    this.ShowSpinner(Spinnertype.BallAtom);
    const allLists: { datas: List_Product_Attribute[], totalCount: number, AttributeName: any } = await this.productAttributeService.getAttributes(this.paginator ? this.paginator.pageIndex : 0, this.paginator ? this.paginator.pageSize : 5, () => this.HideSpinner(Spinnertype.BallAtom), errorMessage => this.alertifyService.message(errorMessage, {
      dismissOthers: true,
      messageType: MessageType.Error,
      position: Position.TopRight
    }))

    this.dataSource = new MatTableDataSource<List_Product_Attribute>(allLists.datas);
    this.paginator.length = allLists.totalCount;
    this.attributeName = allLists.AttributeName;
  }

  async pageChanged() {
    await this.getAttributes();
  }

  async ngOnInit() {
    //this.productId = this.route.snapshot.paramMap.get('id');
    await this.getAttributes();
  }
}