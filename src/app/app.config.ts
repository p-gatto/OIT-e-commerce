import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';   //  NGRX Effects is a middleware

import { routes } from './app.routes';

import * as productsEffects from './core/products/store/products.effects';
import * as cartEffects from './features/cart/store/cart.effects';
import * as orderEffects from './features/shop-order-form/store/order.effects';
import * as authEffects from './core/auth/store/auth.effects';

import { counterFeature, CounterState } from './features/counter/store/counter.features';
import { productsFeature } from './core/products/store/products.features';
import { cartFeature } from './features/cart/store/cart.feature';
import { shopFiltersFeature } from './features/shop/store/shop-filters.feature';
import { UIFeature } from './core/ui/store/ui.feature';
import { authFeature } from './core/auth/store/auth.feature';

import { authInterceptor } from './core/auth/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([authInterceptor])),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore({}, {
      runtimeChecks: {
        strictStateSerializability: true,
        strictActionSerializability: true,
        strictActionTypeUniqueness: true
      }
    }),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    /* provideState(productsFeature),  // SHORT Version */
    provideState({ name: productsFeature.name, reducer: productsFeature.reducer }),
    provideState({ name: cartFeature.name, reducer: cartFeature.reducer }),
    provideState({ name: shopFiltersFeature.name, reducer: shopFiltersFeature.reducer }),
    provideState({ name: UIFeature.name, reducer: UIFeature.reducer }),
    provideState({ name: authFeature.name, reducer: authFeature.reducer }),
    provideEffects([productsEffects, cartEffects, orderEffects, authEffects])
  ]
};
