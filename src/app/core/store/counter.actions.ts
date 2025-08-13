import { createAction, createActionGroup, emptyProps, props } from "@ngrx/store";

/* export const increment = createAction('[Counter] increment');
export const decrement = createAction('[Counter] decrement', props<{ value: number; }>());
export const reset = createAction('[Counter] reset') */

export const CounterActions = createActionGroup({
    source: 'Counter',
    events: {
        'Increment': emptyProps(),
        'Decrement': props<{ value: number }>(),
        'Reset': emptyProps(),
    }
});