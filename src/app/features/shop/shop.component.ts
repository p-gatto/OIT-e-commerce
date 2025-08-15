import { Component, inject } from '@angular/core';

import { Store } from '@ngrx/store';

import { ProductsActions } from '../../core/products/store/products.actions';
import { selectList } from '../../core/products/store/products.features';

import { CartActions } from '../cart/store/cart.actions';

import { Product } from '../../core/products/product.model';

import { ShopFiltersComponent } from './shop-filters/shop-filters.component';

@Component({
  selector: 'app-shop',
  imports: [
    ShopFiltersComponent
  ],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export default class ShopComponent {
  store = inject(Store);
  products = this.store.selectSignal(selectList);

  ngOnInit() {
    this.store.dispatch(ProductsActions.load());
  }

  addProductToCart(product: Product) {
    this.store.dispatch(CartActions.add({ item: product }))
  }

  dispatchAnAction() {
    // here we'll dispatch the action
  }

}