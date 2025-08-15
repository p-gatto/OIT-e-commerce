import { createFeature, createReducer, createSelector, on } from '@ngrx/store';

/* import * as CounterActions from './counter.actions'; */
import { CounterActions } from './counter.actions';

export interface CounterState {
    value: number;
    multiplier: number;
}

const initialState: CounterState = { value: 0, multiplier: 2 }

export const counterFeature = createFeature({
    name: 'counter',
    reducer: createReducer(
        initialState,
        on(CounterActions.increment, (state) => ({ ...state, value: state.value + 1 })),
        on(CounterActions.decrement, (state, action) => {
            const nextValue = state.value - action.value;
            console.log('nextValue: ', nextValue);
            return {
                ...state,
                value: (nextValue < 0 ? 0 : nextValue)
            }
        }),
        on(CounterActions.reset, (state): CounterState => ({ ...state, value: 0 })),
        on(CounterActions.updateMultiplier, (state, action): CounterState => ({ ...state, multiplier: action.value }))
    ),
    extraSelectors: ({ selectValue, selectMultiplier }) => ({
        selectTotal: createSelector(
            selectValue,
            selectMultiplier,
            (value, multiplier) => value * multiplier
        )
    })
});

export const {
    selectValue,
    selectMultiplier,
    selectTotal
} = counterFeature;