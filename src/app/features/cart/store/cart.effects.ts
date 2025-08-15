import { inject } from '@angular/core';

import { map, tap } from 'rxjs';

import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType, rootEffectsInit } from '@ngrx/effects';

import { CartActions } from './cart.actions';
import { selectList } from './cart.feature';

export const saveCartInLocalStorage = createEffect(
    (
        store = inject(Store),
        actions$ = inject(Actions),
    ) => {
        return actions$.pipe(
            ofType(
                CartActions.add,
                CartActions.increaseQuantity,
                CartActions.decreaseQuantity,
                CartActions.remove,
            ),
            tap(() => {
                const cartList = store.selectSignal(selectList)
                localStorage.setItem('cartList', JSON.stringify(cartList()))
            })
        );
    },
    { functional: true, dispatch: false }
);

export const loadCartFromLocalStorage = createEffect((
    actions$ = inject(Actions),
) => {
    return actions$.pipe(
        // filter action
        ofType(rootEffectsInit),
        // map to another action
        map(() => {
            // load data from localStorage
            const cartFromLocalStorage = localStorage.getItem('cartList')
            // if there is data...
            if (cartFromLocalStorage) {
                // dispatch the action passing the localStorage data as payload
                // we use parse since localStorage contains a string and we want to convert it to an array
                return CartActions.loadedFromLocalStorage({ items: JSON.parse(cartFromLocalStorage) })
            } else {
                // dispatch the same action with an empty array as payload
                return CartActions.loadedFromLocalStorage({ items: [] })
            }
        })
    );
},
    { functional: true }
);