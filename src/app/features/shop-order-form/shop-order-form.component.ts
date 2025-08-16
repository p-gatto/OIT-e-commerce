import { Component } from '@angular/core';

import { UserCartSummaryComponent } from './user-cart-summary/user-cart-summary.component';
import { UserInfoFormComponent } from './user-info-form/user-info-form.component';

import { OrderUserForm } from './order-user-form.model';

@Component({
  selector: 'app-shop-order-form',
  imports: [
    UserCartSummaryComponent,
    UserInfoFormComponent
  ],
  templateUrl: './shop-order-form.component.html',
  styleUrl: './shop-order-form.component.scss'
})
export default class ShopOrderFormComponent {

  sendOrder(formData: OrderUserForm) {
    console.log(formData);
  }

}
