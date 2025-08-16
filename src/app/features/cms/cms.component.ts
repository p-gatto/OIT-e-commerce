import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';

import { ProductsActions } from '../../core/products/store/products.actions';
import { selectActive, selectHasError, selectIsPanelOpened, selectList, selectPending } from '../../core/products/store/products.features';
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
  //active = this.store.selectSignal<Partial<Product> | null>(selectActive);

  form = this.fb.nonNullable.group({
    name: ['', [Validators.required]]
  })

  ngOnInit() {
    this.store.dispatch(ProductsActions.load());
  }

  saveProduct() {
    this.store.dispatch(ProductsActions.save({ item: this.form.value }));
  }

  /* addProduct() {
    this.store.dispatch(ProductsActions.addProduct({ item: this.form.value }));
  }

  editProduct() {
    const editedProduct: Partial<Product> = {
      ...this.form.value,
      id: this.active()?.id
    }
    this.store.dispatch(ProductsActions.editProduct({ item: editedProduct }))
  } */

  deleteProduct(product: Product, event: MouseEvent) {
    event.stopPropagation();
    this.store.dispatch(ProductsActions.deleteProduct({ id: product.id }))
  }

  openModalToAddProduct() {
    this.store.dispatch(ProductsActions.openModalAdd());
    this.form.reset();
  }

  openModalToEditProduct(product: Product) {
    // dispatch the modal edit -> Open the modal
    this.store.dispatch(ProductsActions.openModalEdit({ item: product }))
    // populate the form
    this.form.patchValue(product)
  }

  closeModal() {
    this.store.dispatch(ProductsActions.closeModal());
  }
}
