import { createFeature, createReducer, createSelector, on } from '@ngrx/store';

import { ShopFilters } from '../shop-filters/shop-filters.model';

import { ShopFiltersActions } from './shop-filters.actions';
import { selectList } from '../../../core/products/store/products.features';

const initialState: ShopFilters = {
    text: '',
    cost: 2,
    wood: true,
    plastic: true,
    paper: true
}

export const shopFiltersFeature = createFeature({
    name: 'shopFilters',
    reducer: createReducer(
        initialState,
        on(ShopFiltersActions.update, (state, action) => ({
            ...state, ...action.filters
        })),
    ),
    extraSelectors: ({ selectShopFiltersState }) => ({
        selectFilteredList: createSelector(
            selectList,
            selectShopFiltersState,
            (list, filters) => list
                .filter(p => p.name.toLowerCase().includes(filters.text.toLowerCase()))
                .filter(p => p.cost <= filters.cost)
                .filter(p => {
                    return (filters.wood && p.type === 'wood') ||
                        (filters.paper && p.type === 'paper') ||
                        (filters.plastic && p.type === 'plastic')
                })
        )
    })
});

export const {
    selectText,
    selectCost,
    selectWood,
    selectPlastic,
    selectPaper,
    selectFilteredList,
    selectShopFiltersState
} = shopFiltersFeature;
