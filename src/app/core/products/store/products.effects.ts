import { inject } from '@angular/core';

import { map } from 'rxjs';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { ProductsActions } from './products.actions';

export const loadProducts = createEffect(() => {
    const actions$ = inject(Actions);
    return actions$.pipe(
        ofType(ProductsActions.load),
        map(() => ProductsActions.loadSuccess({ items: [] })),
    );
},
    { functional: true }
);