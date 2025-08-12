import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { routes } from './app.routes';

import { counterFeature } from './core/store/counter.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore(),
    provideState({ name: 'home', reducer: () => [1, 2, 3] }),
    /*  provideState({ name: 'counter', reducer: counterReducer }), */ // con le features questa linea di codice la sostituisco con la seguente
    provideState(counterFeature),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })
  ]
};
