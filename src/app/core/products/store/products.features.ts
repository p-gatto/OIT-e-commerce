import { createFeature, createReducer, on } from '@ngrx/store';

import { ProductsActions } from './products.actions';
import { Product } from '../product.model';

// 1. Define the State Type
export interface ProductsState {
    list: Product[];
    pending: boolean;
    hasError: boolean;
}

// 2. The initial State
const initialState: ProductsState = {
    list: [],
    pending: false,
    hasError: false
};

// 3. The Reducer
export const productsFeature = createFeature({
    name: 'products',
    reducer: createReducer(
        initialState,
        on(ProductsActions.load, (state) => ({
            ...state,
            pending: true,
            hasError: false
        })),
        on(ProductsActions.loadSuccess, (state, action) => ({
            list: [...action.items],
            pending: false,
            hasError: false
        })),
        on(ProductsActions.loadFail, (state) => ({
            ...state,
            pending: false,
            hasError: true
        })),
    ),
});

export const {
    selectList,
    selectPending,
    selectHasError
} = productsFeature;