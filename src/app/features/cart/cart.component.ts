import { Component, inject } from '@angular/core';

import { Store } from '@ngrx/store';

import { selectIsCartEmpty, selectList, selectTotalCartCost, selectTotalCartItems } from './store/cart.feature';
import { Product } from '../../core/products/product.model';
import { CartActions } from './store/cart.actions';

@Component({
  selector: 'app-cart',
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export default class CartComponent {

  store = inject(Store);

  cartList = this.store.selectSignal(selectList);
  isCartEmpty = this.store.selectSignal(selectIsCartEmpty)
  totalCartItems = this.store.selectSignal(selectTotalCartItems);
  totalCost = this.store.selectSignal(selectTotalCartCost);

  deleteItem(item: Product) {
    this.store.dispatch(CartActions.remove({ id: item.id }))
  }

}