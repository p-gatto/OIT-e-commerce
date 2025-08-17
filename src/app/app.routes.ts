import { inject } from '@angular/core';
import { Router, Routes } from '@angular/router';

import { provideState, Store } from '@ngrx/store';

import { counterFeature } from './features/counter/store/counter.features';
import { selectIsCartEmpty } from './features/cart/store/cart.feature';

export const routes: Routes = [
    { path: 'shop', loadComponent: () => import('./features/shop/shop.component') },
    { path: 'cart', loadComponent: () => import('./features/cart/cart.component') },
    { path: 'login', loadComponent: () => import('./core/auth/login/login.component') },
    {
        path: 'order-form',
        loadComponent: () => import('./features/shop-order-form/shop-order-form.component'),
        canActivate: [      //  canActivate: [ guard1, guard2, ...]  Normal application with guard (external function that retur boolean. Now with inline funciton.
            () => {         // return true;   => the route is accessible . return false => the route is not accessible.
                const store = inject(Store)
                const router = inject(Router)
                const isCartEmpty = store.selectSignal(selectIsCartEmpty)
                // redirect if cart is empty
                if (isCartEmpty()) {
                    router.navigateByUrl('shop')
                }
                return !isCartEmpty()
            }
        ]
    },
    {
        path: 'counter',
        loadComponent: () => import('./features/counter/counter.component'),
        providers: [
            provideState({ name: 'counter', reducer: counterFeature.reducer }),
        ]
    },
    { path: 'cms', loadComponent: () => import('./features/cms/cms.component') },
    { path: '', redirectTo: 'shop', pathMatch: 'full' }
];
