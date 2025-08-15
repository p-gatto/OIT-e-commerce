import { Component, inject } from '@angular/core';

import { Store } from '@ngrx/store';

import { ProductsActions } from '../../core/products/store/products.actions';

@Component({
  selector: 'app-shop',
  imports: [],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export default class ShopComponent {
  store = inject(Store)

  ngOnInit() {
    this.store.dispatch(ProductsActions.load())
  }
}