import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Store } from '@ngrx/store';

import { AuthActions } from '../../auth/store/auth.actions';

import { selectIsCartEmpty, selectList, selectTotalCartCost, selectTotalCartItems } from '../../../features/cart/store/cart.feature';
import { selectDisplayName, selectIsLogged } from '../../auth/store/auth.feature';

import { IfLoggedDirective } from '../../auth/if-logged.directive';

@Component({
  selector: 'app-nav-bar',
  imports: [
    RouterLink,
    IfLoggedDirective
  ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {

  store = inject(Store);
  /* cartList = this.store.selectSignal(selectList); */

  totalCartItems = this.store.selectSignal(selectTotalCartItems);
  totalCost = this.store.selectSignal(selectTotalCartCost);
  isEmpty = this.store.selectSignal(selectIsCartEmpty);

  displayName = this.store.selectSignal(selectDisplayName);
  isLogged = this.store.selectSignal(selectIsLogged);

  logout() {
    this.store.dispatch(AuthActions.logout())
  }

}