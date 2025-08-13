import { createAction, props } from "@ngrx/store";

export const incrementAction = createAction('[Counter] increment');
export const decrementAction = createAction('[Counter] decrement', props<{ value: number; }>());
export const resetAction = createAction('[Counter] reset')