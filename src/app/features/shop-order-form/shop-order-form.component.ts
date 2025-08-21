import { Component, inject } from '@angular/core';
import { JsonPipe } from '@angular/common';

import { Store } from '@ngrx/store';

import { OrderUserForm } from './order-user-form.model';
import { UserCartSummaryComponent } from './user-cart-summary/user-cart-summary.component';
import { UserInfoFormComponent } from './user-info-form/user-info-form.component';

import { CartItem } from '../cart/cart-item.model';
import { selectList, selectTotalCartCost } from '../cart/store/cart.feature';

import { OrderActions } from './store/order.actions';

@Component({
  selector: 'app-shop-order-form',
  imports: [
    /*  JsonPipe, */
    UserCartSummaryComponent,
    UserInfoFormComponent
  ],
  templateUrl: './shop-order-form.component.html',
  styleUrl: './shop-order-form.component.scss'
})
export default class ShopOrderFormComponent {

  store = inject(Store);
  cartList = this.store.selectSignal<CartItem[]>(selectList);
  totalCost = this.store.selectSignal(selectTotalCartCost);

  sendOrder(formData: OrderUserForm) {
    /* console.log('user data', formData);
    console.log('cart list', this.cartList()); */
    this.store.dispatch(OrderActions.send({ cart: this.cartList(), user: formData }));
  }

}
