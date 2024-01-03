import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, Spinnertype } from 'src/app/base/base/base.component';
import { List_Category } from 'src/app/contracts/category/list_category';
import { List_Product } from 'src/app/contracts/list_product';
import { SelectProductImageDialogComponent } from 'src/app/dialogs/select-product-image-dialog/select-product-image-dialog.component';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { DialogService } from 'src/app/services/common/dialog.service';
import { CategoryService } from 'src/app/services/common/models/category.service';
import { ProductService } from 'src/app/services/common/models/product.service';

declare var $: any;

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseComponent implements OnInit {
  constructor(spinner: NgxSpinnerService, 
    private productService: ProductService,
    private alertifyService: AlertifyService,
    private dialogService: DialogService) {
    super(spinner);
  }

  displayedColumns: string[] = ['name', 'stock', 'price', 'attribute', 'photo', 'edit', 'delete'];
  dataSource: MatTableDataSource<List_Product> = null;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  async getProducts(){
    this.ShowSpinner(Spinnertype.BallAtom);
    const allProducts:{totalProductCount: number; products: List_Product[]} = await this.productService.read(null, this.paginator ? this.paginator.pageIndex : 0,this.paginator ? this.paginator.pageSize : 5, null, () => this.HideSpinner(Spinnertype.BallAtom), errorMessage => this.alertifyService.message(errorMessage, {
      dismissOthers: true,
      messageType: MessageType.Error,
      position: Position.TopRight
    }));
    this.dataSource = new MatTableDataSource<List_Product>(allProducts.products);
    this.paginator.length = "25";
    //this.paginator.length = allProducts.totalCount;
  }

  async pageChanged(){
    await this.getProducts();
  }

  async ngOnInit() {
    await this.getProducts();
  }

  delete(id: any, event: { srcElement: HTMLImageElement; }){
    const img: HTMLImageElement = event.srcElement;
    $(img.parentElement.parentElement).fadeOut(2000);
  }

  addProductImages(id: string){
    this.dialogService.openDialog({
      componentType: SelectProductImageDialogComponent,
      data: id,
      options: {
        width: "1400px"
      }
    });
  }
}