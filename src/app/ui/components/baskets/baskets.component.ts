import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent, Spinnertype } from 'src/app/base/base/base.component';
import { List_Basket_Item } from 'src/app/contracts/basket/list_basket_item';
import { Update_Basket_Item } from 'src/app/contracts/basket/update-basket-item';
import { Create_Order } from 'src/app/contracts/order/create_order';
import { BasketItemDeleteState, BasketItemRemoveDialogComponent } from 'src/app/dialogs/basket-item-remove-dialog/basket-item-remove-dialog.component';
import { ShoppingCompleteDialogComponent, ShoppingCompleteState } from 'src/app/dialogs/shopping-complete-dialog/shopping-complete-dialog.component';
import { Position } from 'src/app/services/admin/alertify.service';
import { DialogService } from 'src/app/services/common/dialog.service';
import { BasketService } from 'src/app/services/common/models/basket.service';
import { OrderService } from 'src/app/services/common/models/order.service';
import { CustomToastrService, TaostrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';

declare var $: any;

@Component({
  selector: 'app-baskets',
  templateUrl: './baskets.component.html',
  styleUrls: ['./baskets.component.scss']
})
export class BasketsComponent extends BaseComponent implements OnInit {
  constructor(spinner: NgxSpinnerService, private basketService: BasketService, 
    private orderService: OrderService, private toastrService: CustomToastrService,
    private router: Router, private dialogService: DialogService) {
    super(spinner)
  }
  
  basketItems: List_Basket_Item[]
  async ngOnInit() {
    this.ShowSpinner(Spinnertype.BallAtom);
    this.basketItems = await this.basketService.get()
    this.HideSpinner(Spinnertype.BallAtom);
  }

  async changeQuentity(object: any){
    this.ShowSpinner(Spinnertype.BallAtom);
    const basketItemId: string = object.target.attributes["id"].value;
    const quantity: number = object.target.value;
    const basketItem: Update_Basket_Item = new Update_Basket_Item();
    basketItem.basketItemId = basketItemId;
    basketItem.quantity = quantity;
    await this.basketService.updateQuantity(basketItem);
    this.HideSpinner(Spinnertype.BallAtom);
  }

   async removeBasketItem(basketItemId: string){
    this.dialogService.openDialog({
      componentType: BasketItemRemoveDialogComponent,
      data: BasketItemDeleteState.Yes,
      afterClosed: async () => {
        this.ShowSpinner(Spinnertype.BallAtom);
        await this.basketService.remove(basketItemId);
        $("." + basketItemId).fadeOut(500, () => this.HideSpinner(Spinnertype.BallAtom));
        $("#basketModal").modal("show");
      }
    });
  }

  async shoppingComplete(){
    $("#basketModal").modal("hide");
    this.dialogService.openDialog({
      componentType: ShoppingCompleteDialogComponent,
      data: ShoppingCompleteState.Yes,
      afterClosed: async()=>{
        this.ShowSpinner(Spinnertype.BallAtom);
        const order: Create_Order = new Create_Order();
        order.address = "Deneme";
        order.description = "deneme";
        await this.orderService.create(order);
        this.HideSpinner(Spinnertype.BallAtom);
        this.toastrService.message("Sipariş alınmıştır!", "Sipariş oluşturuldu!", {
          messageType: TaostrMessageType.Info,
          position: ToastrPosition.TopRight
        });
        this.router.navigate(["/"]);
      }
    });
  }
}
