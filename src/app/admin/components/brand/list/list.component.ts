import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, Spinnertype } from 'src/app/base/base/base.component';
import { List_Brand } from 'src/app/contracts/brand/list_brand';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { DialogService } from 'src/app/services/common/dialog.service';
import { BrandService } from 'src/app/services/common/models/brand.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseComponent implements OnInit {

  constructor(spinner: NgxSpinnerService,
    private brandService: BrandService,
    private alertifyService: AlertifyService,
    private dialogService: DialogService) {
    super(spinner)
  }


  displayedColumns: string[] = ['name', 'edit', 'delete'];
  dataSource: MatTableDataSource<List_Brand> = null;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  async getBrands() {
    this.ShowSpinner(Spinnertype.BallAtom);
    const allBrands: { datas: List_Brand[], totalCount: number } = await this.brandService.getBrands(this.paginator ? this.paginator.pageIndex : 0, this.paginator ? this.paginator.pageSize : 5, () => this.HideSpinner(Spinnertype.BallAtom), errorMessage => this.alertifyService.message(errorMessage, {
      dismissOthers: true,
      messageType: MessageType.Error,
      position: Position.TopRight
    }))

    this.dataSource = new MatTableDataSource<List_Brand>(allBrands.datas);
    this.paginator.length = allBrands.totalCount;
  }

  async pageChanged() {
    await this.getBrands();
  }

  async ngOnInit() {
    await this.getBrands();
  }
}