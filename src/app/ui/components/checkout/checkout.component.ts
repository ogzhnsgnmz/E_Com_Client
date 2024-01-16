import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, Spinnertype } from 'src/app/base/base/base.component';
import { List_Basket_Item } from 'src/app/contracts/basket/list_basket_item';
import { Create_Order } from 'src/app/contracts/order/create_order';
import { ShoppingCompleteDialogComponent, ShoppingCompleteState } from 'src/app/dialogs/shopping-complete-dialog/shopping-complete-dialog.component';
import { AuthService } from 'src/app/services/common/auth.service';
import { DialogService } from 'src/app/services/common/dialog.service';
import { AddressService } from 'src/app/services/common/models/address.service';
import { OrderService } from 'src/app/services/common/models/order.service';
import { CustomToastrService, TaostrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';

declare var $: any;

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})

export class CheckoutComponent extends BaseComponent implements OnInit {
  receivedData: { totalPrice: number; basketItems: List_Basket_Item[] };
  basketItems: List_Basket_Item[]

  subPrice: number = 0;
  kdv: number = 0;
  kargo: number = 30;
  totalPrice: number = 0;
  product: any;
  userName = this.authService.getCurrentUserName();

  constructor(private route: ActivatedRoute,
    private addressService: AddressService,
    private authService: AuthService,
    private dialogService: DialogService,  
    private orderService: OrderService,
    private toastrService: CustomToastrService,
    private router: Router,
    spinner: NgxSpinnerService) {
      super(spinner)
    }

  async ngOnInit(): Promise<void> {
    const basketItems = this.route.snapshot.queryParams['basketItems'];
    this.receivedData = {
      totalPrice: this.route.snapshot.queryParams['totalPrice'],
      basketItems: JSON.parse(basketItems)
    };
    this.basketItems = this.receivedData.basketItems;
    await this.updateTotalPrice(); 
    await this.getAddress();
  }

  private async updateTotalPrice() {
    this.subPrice = this.basketItems.reduce((total, item) => total + (item.price) * item.quantity, 0)
    this.kdv = this.subPrice*18/100
    this.totalPrice = this.subPrice+this.kdv+this.kargo
  }

  async getAddress() {
    this.product = await this.addressService.getAddressByUserName(this.userName,null,null,null);
    console.log();
  }

  async shoppingComplete(){
    $("#basketModal").modal("hide");
    this.dialogService.openDialog({
      componentType: ShoppingCompleteDialogComponent,
      data: ShoppingCompleteState.Yes,
      afterClosed: async()=>{
        this.ShowSpinner(Spinnertype.BallAtom);
        const order: Create_Order = new Create_Order();
        await this.orderService.create(order);
        this.HideSpinner(Spinnertype.BallAtom);
        this.toastrService.message("Sipariş alınmıştır!", "Sipariş oluşturuldu!", {
          messageType: TaostrMessageType.Info,
          position: ToastrPosition.TopRight
        });
        this.router.navigate(["/"]);
      }
    });
    this.updateTotalPrice();
  }
}

