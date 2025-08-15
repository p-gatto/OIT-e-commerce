import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';   //  NGRX Effects is a middleware

import { routes } from './app.routes';

import { counterFeature, CounterState } from './features/counter/store/counter.features';
import * as productsEffects from './core/products/store/products.effects';

export type AppState = {
  home: number[];
  counter: CounterState;
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore({}, {
      runtimeChecks: {
        strictStateSerializability: true,
        strictActionSerializability: true,
        strictActionTypeUniqueness: true
      }
    }),
    provideState({ name: 'home', reducer: () => [1, 2, 3] }),
    /* provideState({ name: 'counter', reducer: counterFeature.reducer }), */ // con le features questa linea di codice la sostituisco con la seguente
    /* provideState(counterFeature), */
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideEffects([productsEffects])
  ]
};
