import { inject } from '@angular/core';

import { Store } from '@ngrx/store';

import { catchError, map, mergeMap, of, tap } from 'rxjs';

import { Actions, createEffect, ofType, rootEffectsInit } from '@ngrx/effects';

import { CartActions } from '../../cart/store/cart.actions';
import { selectList } from '../../cart/store/cart.feature';
import { HttpClient } from '@angular/common/http';
import { OrderActions } from './order.actions';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';

export const loadCartFromLocalStorage = createEffect(
    (
        actions$ = inject(Actions),
    ) => {
        return actions$.pipe(
            ofType(rootEffectsInit),
            map(() => {
                const cartFromLocalStorage = localStorage.getItem('cartList')
                if (cartFromLocalStorage) {
                    return CartActions.loadedFromLocalStorage({ items: JSON.parse(cartFromLocalStorage) })
                } else {
                    return CartActions.loadedFromLocalStorage({ items: [] })
                }
            })
        );
    },
    { functional: true }
);

export const saveCartInLocalStorage = createEffect(
    (
        store = inject(Store),
        actions$ = inject(Actions)
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

export const clearCartLocalStorage = createEffect(
    (
        actions$ = inject(Actions),
    ) => {
        return actions$.pipe(
            ofType(CartActions.clear),
            tap(() => {
                localStorage.removeItem('cartList')
            })
        );
    },
    { functional: true, dispatch: false }
);

// Effect per inviare l'ordine al backend
export const sendOrder = createEffect(
    (
        actions$ = inject(Actions),
        http = inject(HttpClient)
    ) => {
        return actions$.pipe(
            ofType(OrderActions.send),
            mergeMap((action) => {
                // Pulizia del payload - rimuovi campi non necessari
                const cleanedCart = action.cart.map(item => ({
                    product: {
                        id: item.product.id,
                        name: item.product.name,
                        cost: item.product.cost,
                        image: item.product.image,
                        type: item.product.type
                        // Rimuovi createdAt, updatedAt e altri campi non necessari
                    },
                    qty: item.qty
                }));

                const orderPayload = {
                    user: action.user,
                    cart: cleanedCart
                };

                //console.log('Payload pulito inviato:', orderPayload);

                return http.post(`${environment.apiBaseUrl}/orders`, orderPayload)
                    .pipe(
                        map(() => OrderActions.sendSuccess()),
                        catchError((error) => {
                            console.error('Errore nell\'invio dell\'ordine:', error);
                            return of(OrderActions.sendFail());
                        })
                    );
            })
        )
    },
    { functional: true }
);

// Effect per gestire il successo dell'ordine
export const sendOrderSuccess = createEffect(
    (
        actions$ = inject(Actions),
        store = inject(Store),
        router = inject(Router)
    ) => {
        return actions$.pipe(
            ofType(OrderActions.sendSuccess),
            tap(() => {
                // Mostra il dialog di conferma
                const dialog = document.getElementById('order_success_modal') as HTMLDialogElement;
                if (dialog) {
                    dialog.showModal();
                }

                // Svuota il carrello dopo un breve delay per permettere al dialog di apparire
                setTimeout(() => {
                    store.dispatch(CartActions.clear());

                    // Redirect alla shop page dopo altri 3 secondi
                    setTimeout(() => {
                        if (dialog) {
                            dialog.close();
                        }
                        router.navigateByUrl('/shop');
                    }, 10000);
                }, 500);
            })
        );
    },
    { functional: true, dispatch: false }
);

// Effect per gestire l'errore dell'ordine
export const sendOrderFail = createEffect(
    (
        actions$ = inject(Actions)
    ) => {
        return actions$.pipe(
            ofType(OrderActions.sendFail),
            tap(() => {
                // Mostra il dialog di errore
                const dialog = document.getElementById('order_error_modal') as HTMLDialogElement;
                if (dialog) {
                    dialog.showModal();
                }
            })
        );
    },
    { functional: true, dispatch: false }
);