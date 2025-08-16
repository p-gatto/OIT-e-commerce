import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';

import { ProductsActions } from '../../core/products/store/products.actions';
import { selectHasError, selectList, selectPending } from '../../core/products/store/products.features';

@Component({
  selector: 'app-cms',
  imports: [],
  templateUrl: './cms.component.html',
  styleUrl: './cms.component.scss'
})
export default class CmsComponent {
  store = inject(Store);

  error = this.store.selectSignal(selectHasError);
  pending = this.store.selectSignal(selectPending);
  products = this.store.selectSignal(selectList);

  ngOnInit() {
    this.store.dispatch(ProductsActions.load());
  }
}
