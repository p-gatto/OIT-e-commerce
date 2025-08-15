import { createActionGroup, props } from '@ngrx/store';

import { Product } from '../../../core/products/product.model';

export const CartActions = createActionGroup({
    source: 'Cart',
    events: {
        'Add': props<{ item: Product }>(),
        'Remove': props<{ id: number }>(),
        'Increase Quantity': props<{ id: number }>(),
        'Decrease Quantity': props<{ id: number }>()
    }
});