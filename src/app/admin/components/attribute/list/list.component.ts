import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, Spinnertype } from 'src/app/base/base/base.component';
import { List_Attribute } from 'src/app/contracts/attribute/List_Attribute';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { DialogService } from 'src/app/services/common/dialog.service';
import { AttributeService } from 'src/app/services/common/models/attribute.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseComponent implements OnInit {

  constructor(spinner: NgxSpinnerService,
    private attributeService: AttributeService,
    private alertifyService: AlertifyService,
    private dialogService: DialogService) {
    super(spinner)
  }


  displayedColumns: string[] = ['name', 'edit', 'delete'];
  dataSource: MatTableDataSource<List_Attribute> = null;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  async getAttributes() {
    this.ShowSpinner(Spinnertype.BallAtom);
    const allRoles: { datas: List_Attribute[], totalCount: number } = await this.attributeService.getAttributes(this.paginator ? this.paginator.pageIndex : 0, this.paginator ? this.paginator.pageSize : 5, () => this.HideSpinner(Spinnertype.BallAtom), errorMessage => this.alertifyService.message(errorMessage, {
      dismissOthers: true,
      messageType: MessageType.Error,
      position: Position.TopRight
    }))

    this.dataSource = new MatTableDataSource<List_Attribute>(allRoles.datas);
    this.paginator.length = allRoles.totalCount;
  }

  async pageChanged() {
    await this.getAttributes();
  }

  async ngOnInit() {
    await this.getAttributes();
  }
}