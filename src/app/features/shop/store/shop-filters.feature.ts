import { createFeature, createReducer, on } from '@ngrx/store';

import { ShopFilters } from '../shop-filters/shop-filters.model';
import { ShopFiltersActions } from './shop-filters.actions';

// 1. the initial state
const initialState: ShopFilters = {
    text: '',
    cost: 2,
    wood: true,
    plastic: true,
    paper: true
}

// 2. the reducer
export const shopFiltersFeature = createFeature({
    name: 'shopFilters',
    reducer: createReducer(
        initialState,
        on(ShopFiltersActions.update, (state, action) => ({
            ...state, ...action.filters
        })),
    ),
});

// 3. export available selectors
// (one for each filter + the whole state)
export const {
    selectText,
    selectCost,
    selectWood,
    selectPlastic,
    selectPaper,
    selectShopFiltersState,
} = shopFiltersFeature;