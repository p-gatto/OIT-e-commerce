import { Component, input, output } from '@angular/core';

import { Product } from '../../../core/products/product.model';

@Component({
  selector: 'app-cms-products-list',
  imports: [],
  templateUrl: './cms-products-list.component.html',
  styleUrl: './cms-products-list.component.scss'
})
export class CmsProductsListComponent {

  products = input.required<Product[]>()
  deleteProduct = output<Product>()
  openModal = output<Product>()

  deleteProductHandler(product: Product, event: MouseEvent) {
    event.stopPropagation()
    this.deleteProduct.emit(product)
  }

}