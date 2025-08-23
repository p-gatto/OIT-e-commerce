import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { Product } from '../../products/product.model';
import { CartItem } from '../cart-item.model';

export const CartActions = createActionGroup({
    source: 'Cart',
    events: {
        'Loaded From Local Storage': props<{ items: CartItem[] }>(),
        'Add': props<{ item: Product }>(),
        'Remove': props<{ id: string }>(),
        'Increase Quantity': props<{ id: string }>(),
        'Decrease Quantity': props<{ id: string }>(),
        'Clear': emptyProps()
    }
});