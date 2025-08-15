import { createFeature, createReducer, createSelector, on } from '@ngrx/store';

import { CartActions } from './cart.actions';

import { Product } from '../../../core/products/product.model';

export interface CartState {
    list: Product[];
}

const initialState: CartState = {
    list: []
}

export const cartFeature = createFeature({
    name: 'cart',
    reducer: createReducer(
        initialState,
        on(CartActions.add, (state, action) => ({
            ...state,
            list: [...state.list, action.item]
        })),
        on(CartActions.remove, (state, action) => ({
            ...state,
            list: state.list.filter(item => item.id !== action.id)
        })),
    ),
    extraSelectors: ({ selectList }) => ({
        selectIsCartEmpty: createSelector(
            selectList,
            (list) => list.length === 0
        ),
        selectTotalCartItems: createSelector(
            selectList,
            (list) => list.length
        ),
        selectTotalCartCost: createSelector(
            selectList,
            (list) => list.reduce((total, item) => total + item.cost, 0)
        )
    })
});

export const {
    selectList,
    selectIsCartEmpty,
    selectTotalCartItems,
    selectTotalCartCost
} = cartFeature;