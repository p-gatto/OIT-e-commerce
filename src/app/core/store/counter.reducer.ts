import { createFeature, createReducer, on } from "@ngrx/store"

import { incrementAction } from "./counter.actions";

export interface CounterState {
    value: number;
}

const initialState: CounterState = { value: 123 };

/* export const counterReducer = createReducer(
    initialState,
    on(increment, state => ({ value: state.value + 1 }))
) */

export const counterFeature = createFeature({
    name: 'counter',
    reducer: createReducer(
        initialState,
        on(incrementAction, state => ({ value: state.value + 1 }))
    )
})