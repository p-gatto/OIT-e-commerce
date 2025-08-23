import { Component, inject } from '@angular/core';

import { Store } from '@ngrx/store';

import { selectIsCartEmpty, selectList, selectTotalCartCost, selectTotalCartItems } from './store/cart.feature';

import { CartActions } from './store/cart.actions';
import { CartItem } from './cart-item.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [
    RouterLink
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export default class CartComponent {

  store = inject(Store);

  cartList = this.store.selectSignal(selectList);
  isCartEmpty = this.store.selectSignal(selectIsCartEmpty)
  totalCartItems = this.store.selectSignal(selectTotalCartItems);
  totalCost = this.store.selectSignal(selectTotalCartCost);

  deleteItem(item: CartItem) {
    this.store.dispatch(CartActions.remove({ id: item.product.id }))
  }

  decreaseQty(cartItemId: string) {
    this.store.dispatch(CartActions.decreaseQuantity({ id: cartItemId }))
  }
  increaseQty(cartItemId: string) {
    this.store.dispatch(CartActions.increaseQuantity({ id: cartItemId }))
  }

}