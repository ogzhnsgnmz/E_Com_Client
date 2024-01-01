import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { List_Basket_Item } from 'src/app/contracts/basket/list_basket_item';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {
  receivedData: { totalPrice: number; basketItems: List_Basket_Item[] };
  basketItems: List_Basket_Item[]
  constructor(private route: ActivatedRoute) {
    const basketItems = this.route.snapshot.queryParams['basketItems'];
    this.receivedData = {
      totalPrice: this.route.snapshot.queryParams['totalPrice'],
      basketItems: JSON.parse(basketItems)
    };
  }
}

