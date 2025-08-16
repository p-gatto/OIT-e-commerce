import { createFeature, createReducer, on } from '@ngrx/store';

import { ProductsActions } from './products.actions';
import { Product } from '../product.model';

// 1. Define the State Type
export interface ProductsState {
    list: Product[];
    pending: boolean;
    hasError: boolean;
    isPanelOpened: boolean;
    active: Partial<Product> | null;
}

// 2. The initial State
const initialState: ProductsState = {
    list: [],
    pending: false,
    hasError: false,
    isPanelOpened: false,
    active: null
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
            hasError: false,
            isPanelOpened: false,
            active: null
        })),
        on(ProductsActions.loadFail, (state) => ({
            ...state,
            pending: false,
            hasError: true
        })),
        on(ProductsActions.deleteProduct, (state): ProductsState => ({
            ...state,
            hasError: false,
            pending: true
        })),
        on(ProductsActions.deleteProductSuccess, (state, action): ProductsState => ({
            ...state,
            list: state.list.filter(item => item.id !== action.id),
            hasError: false,
            pending: false
        })),
        on(ProductsActions.deleteProductFail, (state): ProductsState => ({
            ...state,
            hasError: true,
            pending: false
        })),
        // 1. dispatched when the modal is opened to add a new product
        on(ProductsActions.openModalAdd, (state): ProductsState => ({
            ...state, isPanelOpened: true
        })),
        // 2. dispatched when the modal is opened to edit a existing product
        on(ProductsActions.openModalEdit, (state, action): ProductsState => ({
            ...state, isPanelOpened: true, active: action.item
        })),
        // 3. dispatched when the modal should be closed
        on(ProductsActions.closeModal, (state): ProductsState => ({
            ...state, isPanelOpened: false, active: null
        })),
        on(ProductsActions.addProduct, (state): ProductsState => ({
            ...state,
            hasError: false,
            pending: true
        })),
        on(ProductsActions.addProductSuccess, (state, action): ProductsState => ({
            ...state,
            list: [...state.list, action.item],
            hasError: false,
            pending: false,
            isPanelOpened: false
        })),
        on(ProductsActions.addProductFail, (state): ProductsState => ({
            ...state,
            hasError: true,
            pending: false,
            isPanelOpened: false
        })),
        on(ProductsActions.editProduct, (state): ProductsState => ({
            ...state,
            hasError: false,
            pending: true
        })),
        on(ProductsActions.editProductSuccess, (state, action): ProductsState => ({
            ...state,
            list: state.list.map(item => {
                return item.id === action.item.id ? action.item : item
            }),
            hasError: false,
            pending: false,
            isPanelOpened: false,
            active: null
        })),
        on(ProductsActions.editProductFail, (state): ProductsState => ({
            ...state,
            hasError: true,
            isPanelOpened: false,
            pending: false
        }))
    )
});

export const {
    selectList,
    selectPending,
    selectHasError,
    selectIsPanelOpened,
    selectActive
} = productsFeature;