import { createActionGroup, props } from '@ngrx/store';

import { ShopFilters } from '../shop-filters/shop-filters.model';

export const ShopFiltersActions = createActionGroup({
    source: 'Shop Filters',
    events: {
        'Update': props<{ filters: Partial<ShopFilters> }>(),
    }
});