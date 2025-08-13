import { Component, inject } from '@angular/core';

import { Store } from '@ngrx/store';

import { AppState } from '../../app.config';

import { counterFeature } from '../../core/store/counter.reducer';
import { decrementAction, incrementAction, resetAction } from '../../core/store/counter.actions';

@Component({
  selector: 'app-counter',
  imports: [],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.scss'
})
export default class CounterComponent {

  store = inject(Store)

  counter = this.store.selectSignal((state: AppState) => state.counter.value)

  inc() {
    this.store.dispatch(incrementAction())
  }

  dec() {
    this.store.dispatch(decrementAction({ value: 2 }))
  }

  resetToZero() {
    this.store.dispatch(resetAction())
  }

}