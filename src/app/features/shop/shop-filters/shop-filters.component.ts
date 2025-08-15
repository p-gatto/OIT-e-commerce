import { JsonPipe } from '@angular/common';
import { Component, inject, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from "@angular/forms";

import { debounceTime } from 'rxjs';

import { ShopFilters } from './shop-filters.model';

@Component({
  selector: 'app-shop-filters',
  imports: [
    JsonPipe,
    ReactiveFormsModule
  ],
  templateUrl: './shop-filters.component.html',
  styleUrl: './shop-filters.component.scss'
})
export class ShopFiltersComponent {

  changeFilters = output<Partial<ShopFilters>>();

  fb = inject(FormBuilder);

  form = this.fb.nonNullable.group({
    text: '',       // initialized to an empty string
    cost: 2,        // initialized to 2
    wood: true,     // initialized to true
    plastic: true,  // initialized to true
    paper: false    // initialized to false
  });


  constructor() {
    this.form.valueChanges
      .pipe(
        debounceTime(1000)
      )
      .subscribe(data => {
        this.changeFilters.emit(this.form.value);
        console.log(this.form.value) // output { text: '...', cost: '', wood: true, ....}
      })
  }

}