import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';

import { ProductsActions } from '../../core/products/store/products.actions';
import { selectHasError, selectIsPanelOpened, selectList, selectPending } from '../../core/products/store/products.features';
import { Product } from '../../core/products/product.model';

@Component({
  selector: 'app-cms',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './cms.component.html',
  styleUrl: './cms.component.scss'
})
export default class CmsComponent {

  store = inject(Store);
  fb = inject(FormBuilder);

  error = this.store.selectSignal(selectHasError);
  pending = this.store.selectSignal(selectPending);
  products = this.store.selectSignal(selectList);
  isModalOpened = this.store.selectSignal(selectIsPanelOpened);

  form = this.fb.nonNullable.group({
    name: ['', [Validators.required]]
  })

  ngOnInit() {
    this.store.dispatch(ProductsActions.load());
  }

  addProduct() {
    this.store.dispatch(ProductsActions.addProduct({ item: this.form.value }));
  }

  deleteProduct(product: Product) {
    this.store.dispatch(ProductsActions.deleteProduct({ id: product.id }));
  }

  openModalToAddProduct() {
    this.store.dispatch(ProductsActions.openModalAdd());
    this.form.reset();
  }

  closeModal() {
    this.store.dispatch(ProductsActions.closeModal());
  }
}
