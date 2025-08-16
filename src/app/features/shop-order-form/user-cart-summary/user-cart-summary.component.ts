import { Component, input } from '@angular/core';

import { CartItem } from '../../cart/cart-item.model';

@Component({
  selector: 'app-user-cart-summary',
  imports: [],
  templateUrl: './user-cart-summary.component.html',
  styleUrl: './user-cart-summary.component.scss'
})
export class UserCartSummaryComponent {

  list = input.required<CartItem[]>();
  totalCost = input.required<number>();

  shippingCost = 10;

}
