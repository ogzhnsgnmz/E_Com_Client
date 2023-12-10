import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, Spinnertype } from 'src/app/base/base/base.component';
import { List_Basket_Item } from 'src/app/contracts/basket/list_basket_item';
import { Update_Basket_Item } from 'src/app/contracts/basket/update-basket-item';
import { BasketService } from 'src/app/services/common/models/basket.service';

declare var $: any;

@Component({
  selector: 'app-baskets',
  templateUrl: './baskets.component.html',
  styleUrls: ['./baskets.component.scss']
})
export class BasketsComponent extends BaseComponent implements OnInit {
  constructor(spinner: NgxSpinnerService, private basketService: BasketService) {
    super(spinner)
  }
  
  basketItems: List_Basket_Item[];
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
    this.ShowSpinner(Spinnertype.BallAtom);
    await this.basketService.remove(basketItemId);
    $("." + basketItemId).fadeOut(500, () => this.HideSpinner(Spinnertype.BallAtom));
  }
}
