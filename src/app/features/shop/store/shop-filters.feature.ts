import { createFeature, createReducer, createSelector, on } from '@ngrx/store';

import { ShopFilters } from '../shop-filters/shop-filters.model';

import { ShopFiltersActions } from './shop-filters.actions';
import { selectList } from '../../../features/products/store/products.features';

const initialState: ShopFilters = {
    text: '',
    cost: 2,
    fruit: true,
    vegetable: true,
    herbs: true
    /* wood: true,
    plastic: true,
    paper: true */
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
                    return (filters.fruit && p.type === 'fruit') ||
                        (filters.vegetable && p.type === 'vegetable') ||
                        (filters.herbs && p.type === 'herbs')
                })
        )
    })
});

export const {
    selectText,
    selectCost,
    selectFruit,
    selectVegetable,
    selectHerbs,
    selectFilteredList,
    selectShopFiltersState
} = shopFiltersFeature;
