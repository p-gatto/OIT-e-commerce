import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-cms-products-bar',
  imports: [],
  templateUrl: './cms-products-bar.component.html',
  styleUrl: './cms-products-bar.component.scss'
})
export class CmsProductsBarComponent {
  error = input.required<boolean>();
  pending = input.required<boolean>();

  openModal = output();
}
