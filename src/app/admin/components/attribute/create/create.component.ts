import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, Spinnertype } from 'src/app/base/base/base.component';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { AttributeService } from 'src/app/services/common/models/attribute.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent extends BaseComponent implements OnInit {

  constructor(spiner: NgxSpinnerService,
    private attributeService: AttributeService,
    private alertify: AlertifyService) {
    super(spiner)
  }

  ngOnInit(): void {
  }

  @Output() createdRole: EventEmitter<string> = new EventEmitter();

  create(name: HTMLInputElement) {
    this.ShowSpinner(Spinnertype.BallAtom);


    this.attributeService.create(name.value, () => {
      this.HideSpinner(Spinnertype.BallAtom);
      this.alertify.message("Role başarıyla eklenmiştir.", {
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
