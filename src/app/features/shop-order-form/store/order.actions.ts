import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { OrderUserForm } from '../order-user-form.model';
import { CartItem } from '../../cart/cart-item.model';

export const OrderActions = createActionGroup({
    source: 'Order',
    events: {
        'Send': props<{ user: OrderUserForm, cart: CartItem[] }>(),
        'Send Success': emptyProps(),
        'Send Fail': emptyProps(),
    }
});