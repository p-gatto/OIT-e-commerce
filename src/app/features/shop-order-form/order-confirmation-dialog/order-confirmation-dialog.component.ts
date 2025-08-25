import { Component, inject } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { Store } from '@ngrx/store';

import { selectList, selectTotalCartCost, selectTotalCartItems } from '../../cart/store/cart.feature';

@Component({
    selector: 'app-order-confirmation-dialog',
    imports: [
        DecimalPipe
    ],
    templateUrl: './order-confirmation-dialog.component.html',
    styleUrl: './order-confirmation-dialog.component.scss'
})
export class OrderConfirmationDialogComponent {

    store = inject(Store);

    cartList = this.store.selectSignal(selectList);
    totalItems = this.store.selectSignal(selectTotalCartItems);
    subtotal = this.store.selectSignal(selectTotalCartCost);

    // Calcolo del totale comprensivo di spedizione
    totalCost = () => this.subtotal() + 10; // 10€ di spedizione

}