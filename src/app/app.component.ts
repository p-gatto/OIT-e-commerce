import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Store } from '@ngrx/store';

import { increment } from './core/store/counter.actions';
import { counterFeature } from './core/store/counter.reducer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'OIT-e-commerce';

  store = inject(Store);

  /* counter = this.store.selectSignal(state => state.counter.value); */ // con l'utilizzo delle feature la possiamo scrivere come la seguente
  counter = this.store.selectSignal(counterFeature.selectValue);


  inc() {
    this.store.dispatch(increment());
  }
}