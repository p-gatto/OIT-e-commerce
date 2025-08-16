import { Component, effect, inject, input, output } from '@angular/core';
import { Product } from '../../../core/products/product.model';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-cms-products-modal',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './cms-products-modal.component.html',
  styleUrl: './cms-products-modal.component.scss'
})
export class CmsProductsModalComponent {

  isModalOpened = input.required<boolean>();
  active = input.required<Partial<Product> | null>()
  closeModal = output()
  saveProduct = output<Partial<Product>>()

  fb = inject(FormBuilder)

  form = this.fb.nonNullable.group({
    name: ['', [Validators.required]]
  })

  constructor() {
    effect(() => {
      const active = this.active()
      if (active) {
        this.form.patchValue(active)
      } else {
        this.form.reset()
      }
    });
  }
}