import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';

import { ProductsActions } from '../../core/products/store/products.actions';
import { selectActive, selectHasError, selectIsPanelOpened, selectList, selectPending } from '../../core/products/store/products.features';

import { Product } from '../../core/products/product.model';
import { CmsProductsBarComponent } from './cms-products-bar/cms-products-bar.component';
import { CmsProductsListComponent } from './cms-products-list/cms-products-list.component';
import { CmsProductsModalComponent } from './cms-products-modal/cms-products-modal.component';

@Component({
  selector: 'app-cms',
  imports: [
    ReactiveFormsModule,
    CmsProductsBarComponent,
    CmsProductsListComponent,
    CmsProductsModalComponent
  ],
  templateUrl: './cms.component.html',
  styleUrl: './cms.component.scss'
})
export default class CmsComponent {

  store = inject(Store)
  error = this.store.selectSignal<boolean>(selectHasError);
  pending = this.store.selectSignal<boolean>(selectPending);
  products = this.store.selectSignal<Product[]>(selectList);
  isModalOpened = this.store.selectSignal<boolean>(selectIsPanelOpened);
  active = this.store.selectSignal<Partial<Product> | null>(selectActive);

  ngOnInit() {
    this.store.dispatch(ProductsActions.load())
  }

  deleteProduct(product: Product) {
    this.store.dispatch(ProductsActions.deleteProduct({ id: product.id }))
  }

  openModalToAddProduct() {
    this.store.dispatch(ProductsActions.openModalAdd())
  }

  openModalToEditProduct(product: Product) {
    this.store.dispatch(ProductsActions.openModalEdit({ item: product }))
  }

  closeModal() {
    this.store.dispatch(ProductsActions.closeModal())
  }

  saveProduct(product: Partial<Product>) {
    this.store.dispatch(ProductsActions.save({ item: product }))
  }

}