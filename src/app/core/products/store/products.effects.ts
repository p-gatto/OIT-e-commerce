import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { catchError, map, mergeMap, of } from 'rxjs';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { ProductsActions } from './products.actions';

import { Product } from '../product.model';

export const loadProducts = createEffect(
    (
        actions$ = inject(Actions),
        http = inject(HttpClient)
    ) => {
        return actions$.pipe(
            ofType(ProductsActions.load),
            mergeMap(() =>
                http.get<Product[]>('http://localhost:3001/products')
                    .pipe(
                        map((items) =>
                            ProductsActions.loadSuccess({ items })
                        ),
                        catchError((error) =>
                            of(ProductsActions.loadFail())
                        )
                    )
            )
        );
    },
    { functional: true }
);