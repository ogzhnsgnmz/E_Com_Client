import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, Spinnertype } from 'src/app/base/base/base.component';
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
    private alertify: AlertifyService,
    private route: ActivatedRoute) {
    super(spiner)
  }

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id');
  }

  @Output() createdRole: EventEmitter<string> = new EventEmitter();

  create(name: HTMLInputElement) {
    this.ShowSpinner(Spinnertype.BallAtom);


    this.productAttributeService.create(this.productId, name.value, () => {
      this.HideSpinner(Spinnertype.BallAtom);
      this.alertify.message("Size başarıyla eklenmiştir.", {
        dismissOthers: true,
        messageType: MessageType.Success,
        position: Position.TopRight
      });
      this.createdRole.emit(name.value);
    }, errorMessage => {
      this.alertify.message(errorMessage,
        {
          dismissOthers: true,
          messageType: MessageType.Error,
          position: Position.TopRight
        });
    });
  }
}
