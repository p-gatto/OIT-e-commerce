import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';

import { ProductsActions } from '../../core/products/store/products.actions';

@Component({
  selector: 'app-cms',
  imports: [],
  templateUrl: './cms.component.html',
  styleUrl: './cms.component.scss'
})
export default class CmsComponent {
  store = inject(Store)

  ngOnInit() {
    this.store.dispatch(ProductsActions.load())
  }
}
