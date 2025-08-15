import { Component, computed, effect, inject, signal } from '@angular/core';

import { Store } from '@ngrx/store';

import { selectMultiplier, selectTotal, selectValue } from './store/counter.features';
import { CounterActions } from './store/counter.actions';

@Component({
  selector: 'app-counter',
  imports: [],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.scss'
})
export default class CounterComponent {

  store = inject(Store);

  counter = this.store.selectSignal(selectValue);
  // multiplier = signal(2);                                // Local State
  multiplier = this.store.selectSignal(selectMultiplier);   // NGRX Global State
  /*  total = computed(() => this.counter() * this.multiplier()); */
  total = this.store.selectSignal(selectTotal);

  /* constructor() {
    effect(() => {
      console.log('do something with', this.counter())
    });
  }
 */
  inc() {
    this.store.dispatch(CounterActions.increment());
  }

  dec() {
    this.store.dispatch(CounterActions.decrement({ value: 2 }));
  }

  resetToZero() {
    this.store.dispatch(CounterActions.reset());
  }

  changeMultiplier(value: number) {
    this.store.dispatch(CounterActions.updateMultiplier({ value }))
  }

}