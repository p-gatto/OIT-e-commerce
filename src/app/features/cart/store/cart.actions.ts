import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { Product } from '../../products/product.model';
import { CartItem } from '../cart-item.model';

export const CartActions = createActionGroup({
    source: 'Cart',
    events: {
        'Loaded From Local Storage': props<{ items: CartItem[] }>(),
        'Add': props<{ item: Product }>(),
        'Remove': props<{ id: number }>(),
        'Increase Quantity': props<{ id: number }>(),
        'Decrease Quantity': props<{ id: number }>(),
        'Clear': emptyProps()
    }
});