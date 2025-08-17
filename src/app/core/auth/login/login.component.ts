import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';

import { AuthActions } from '../store/auth.actions';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export default class LoginComponent {

  store = inject(Store);
  fb = inject(FormBuilder);

  form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  login() {
    this.store.dispatch(AuthActions.login({
      username: this.form.getRawValue().username,
      password: this.form.getRawValue().password
    }))
  }

}