import { Component, inject } from '@angular/core';

import { Store } from '@ngrx/store';

import { ProductsActions } from '../../core/products/store/products.actions';
import { selectList } from '../../core/products/store/products.features';

import { CartActions } from '../cart/store/cart.actions';

import { Product } from '../../core/products/product.model';

import { ShopFiltersComponent } from './shop-filters/shop-filters.component';

import { ShopFilters } from './shop-filters/shop-filters.model';
import { ShopFiltersActions } from './store/shop-filters.actions';
import { selectFilteredList } from './store/shop-filters.feature';

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
  products = this.store.selectSignal(selectFilteredList)

  ngOnInit() {
    this.store.dispatch(ProductsActions.load());
  }

  addProductToCart(product: Product) {
    this.store.dispatch(CartActions.add({ item: product }))
  }

  updateFilter(filters: Partial<ShopFilters>) {
    this.store.dispatch(ShopFiltersActions.update({ filters }));
    console.log(filters);
  }

}