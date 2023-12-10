import { Component, OnInit, Inject, Output } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseDialog } from '../base/base-dialog';
import { FileUploadOptions } from 'src/app/services/common/file-upload/file-upload.component';
import { DialogService } from 'src/app/services/common/dialog.service';
import { DeleteDialogComponent, DeleteState } from '../delete-dialog/delete-dialog.component';

import { NgxSpinnerService } from 'ngx-spinner';
import { ProductService } from 'src/app/services/common/models/product.service';
import { List_Product_Image } from 'src/app/contracts/list_product_image';
import { Spinnertype } from 'src/app/base/base/base.component';
import { HttpClientService } from 'src/app/services/common/http-client.service';
import { firstValueFrom } from 'rxjs';

declare var $: any

@Component({
  selector: 'app-select-product-image-dialog',
  templateUrl: './select-product-image-dialog.component.html',
  styleUrls: ['./select-product-image-dialog.component.scss']
})
export class SelectProductImageDialogComponent extends BaseDialog<SelectProductImageDialogComponent> implements OnInit {

  constructor(dialogRef: MatDialogRef<SelectProductImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SelectProductImageState | string,
    private productService:ProductService,
    private spinner: NgxSpinnerService,
    private dialogService: DialogService,
    private httpClientService: HttpClientService) {
    super(dialogRef);   
  }

  async ngOnInit() {
    this.spinner.show(Spinnertype.BallAtom);
    this.images = await this.productService.readImage(this.data as string, () => this.spinner.hide(Spinnertype.BallAtom));
    
    // options'u burada tanımlayın
    this.options = {
      accept: ".png, .jpg, .jpeg, .gif",
      action: "upload",
      controller: "products",
      explanation: "Ürün resmini seçin veya buraya sürükleyin...",
      isAdminPage: true,
      queryString: `id=${this.data}`
    };
  }

  images? : List_Product_Image[]; 
  
  @Output() options: Partial<FileUploadOptions> = {
    accept: ".png, .jpg, .jpeg, .gif",
    action: "upload",
    controller: "products",
    explanation: "Ürün resmini seçin veya buraya sürükleyin...",
    isAdminPage: true,
    queryString: `id=${this.data}`
  };  


  async deleteImage(imageId: string, event: any) {
    this.dialogService.openDialog({
      componentType: DeleteDialogComponent,
      data: DeleteState.Yes,
      afterClosed: async () => {
        this.spinner.show(Spinnertype.BallAtom)
        await this.productService.deleteImage(this.data as string, imageId, () => {
          this.spinner.hide(Spinnertype.BallAtom);
          var card = $(event.srcElement).parent().parent();
          card.fadeOut(500);
        });
      }
    })
  }

  showCase(imageId: string) {
    this.spinner.show(Spinnertype.BallAtom);
    this.productService.changeShowcaseImage(imageId, this.data as string, () => {
      this.spinner.hide(Spinnertype.BallAtom)
    })
  }

  async changeShowcaseImage(imageId: string, productId: string, succesCallBack?:() => void) : Promise<void>{
    const changeShowcaseImageObservable = this.httpClientService.get({
      controller: "products",
      action: "ChangeShowcaseImage",
      queryString: `imageId=${imageId}&productId=${productId}`,
    });
    await firstValueFrom(changeShowcaseImageObservable);
    succesCallBack();
  }
}

export enum SelectProductImageState{
  Close
}