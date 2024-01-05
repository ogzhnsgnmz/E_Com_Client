import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, Spinnertype } from 'src/app/base/base/base.component';
import { List_Attribute } from 'src/app/contracts/attribute/List_Attribute';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { ProductAttributeService } from 'src/app/services/common/models/product-attribute.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent extends BaseComponent implements OnInit {

  productId: string;

  constructor(spiner: NgxSpinnerService,
    private productAttributeService: ProductAttributeService,
    private alertifyService: AlertifyService,
    private route: ActivatedRoute) {
    super(spiner)
    this.getAttributes();
  }

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id');
  }
  selectedAttribute = 'None';
  attributeDataSource: MatTableDataSource<List_Attribute> = new MatTableDataSource<List_Attribute>();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  async getAttributes() {
    this.ShowSpinner(Spinnertype.BallAtom);
    const allAttributes: { datas: List_Attribute[], totalCount: number } = await this.productAttributeService.getAttributes(
      this.paginator ? this.paginator.pageIndex : 0,
      this.paginator ? this.paginator.pageSize : 5,
      () => this.HideSpinner(Spinnertype.BallAtom),
      errorMessage => this.alertifyService.message(errorMessage, {
        dismissOthers: true,
        messageType: MessageType.Error,
        position: Position.TopRight
      })
    );
  
    this.attributeDataSource = new MatTableDataSource<List_Attribute>(allAttributes.datas);
  }

  @Output() createdRole: EventEmitter<string> = new EventEmitter();

  create(value: HTMLInputElement, attributeId: HTMLInputElement) {
    this.ShowSpinner(Spinnertype.BallAtom);

    this.productAttributeService.create(this.productId, value.value, attributeId.value, () => {
      this.HideSpinner(Spinnertype.BallAtom);
      this.alertifyService.message("Size başarıyla eklenmiştir.", {
        dismissOthers: true,
        messageType: MessageType.Success,
        position: Position.TopRight
      });
      this.createdRole.emit(value.value);
    }, errorMessage => {
      this.alertifyService.message(errorMessage,
        {
          dismissOthers: true,
          messageType: MessageType.Error,
          position: Position.TopRight
        });
    });
  }
}
