import { Component, inject } from '@angular/core';

import { Store } from '@ngrx/store';

import { ProductsActions } from '../../features/products/store/products.actions';
import { selectList, selectPending } from '../../features/products/store/products.features';

import { CartActions } from '../cart/store/cart.actions';

import { Product } from '../products/product.model';

import { ShopFiltersComponent } from './shop-filters/shop-filters.component';

import { ShopFilters } from './shop-filters/shop-filters.model';
import { ShopFiltersActions } from './store/shop-filters.actions';
import { selectFilteredList, selectShopFiltersState } from './store/shop-filters.feature';

import { UiActions } from '../../core/ui/store/ui.actions';
import { selectSidePanelOpened } from '../../core/ui/store/ui.feature';

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

  products = this.store.selectSignal(selectFilteredList);
  isOpen = this.store.selectSignal(selectSidePanelOpened);
  filters = this.store.selectSignal<ShopFilters>(selectShopFiltersState);

  isLoading = this.store.selectSignal(selectPending); // Aggiunto per lo spinner

  ngOnInit() {
    this.store.dispatch(ProductsActions.load());
  }

  addProductToCart(product: Product) {
    this.store.dispatch(CartActions.add({ item: product }))
  }

  updateFilter(filters: Partial<ShopFilters>) {
    this.store.dispatch(ShopFiltersActions.update({ filters }));
    //console.log(filters);
  }

  togglePanel() {
    this.store.dispatch(UiActions.toggleSidePanel());
  }

  closePanel() {
    this.store.dispatch(UiActions.closeSidePanel());
  }

}