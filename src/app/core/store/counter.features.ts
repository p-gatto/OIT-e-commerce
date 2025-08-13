import { createFeature, createReducer, on } from '@ngrx/store';

/* import * as CounterActions from './counter.actions'; */
import { CounterActions } from './counter.actions';

export interface CounterState {
    value: number;
}

const initialState: CounterState = { value: 0 }

export const counterFeature = createFeature({
    name: 'counter',
    reducer: createReducer(
        initialState,
        on(CounterActions.increment, (state) => ({ value: state.value + 1 })),
        on(CounterActions.decrement, (state, action) => {
            const nextValue = state.value - action.value;
            console.log('nextValue: ', nextValue);
            return {
                value: (nextValue < 0 ? 0 : nextValue)
            }
        }),
        on(CounterActions.reset, () => ({ value: 0 })),
    )
});

export const {
    selectValue,
} = counterFeature;