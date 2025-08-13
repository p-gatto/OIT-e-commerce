import { Component, inject } from '@angular/core';

import { Store } from '@ngrx/store';

import { selectValue } from '../../core/store/counter.features';
import { CounterActions } from '../../core/store/counter.actions';

@Component({
  selector: 'app-counter',
  imports: [],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.scss'
})
export default class CounterComponent {

  store = inject(Store);

  counter = this.store.selectSignal(selectValue);

  inc() {
    this.store.dispatch(CounterActions.increment());
  }

  dec() {
    this.store.dispatch(CounterActions.decrement({ value: 2 }));
  }

  resetToZero() {
    this.store.dispatch(CounterActions.reset());
  }

}