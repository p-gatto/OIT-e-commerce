import { inject } from '@angular/core';
import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';

import { Store } from '@ngrx/store';

import { selectToken } from './store/auth.feature';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const router = inject(Router);
  const store = inject(Store);

  const token = store.selectSignal(selectToken);

  // if route contains `/cms` and token() is available (so user is logged)
  if (router.url.includes('/cms') && token()) {
    // clone the request and add the token
    return next(req.clone({
      setHeaders: {
        Authorization: `Bearer ${token()}`
      }
    }))
  }

  // in any other case, we return the original request without changes
  return next(req).pipe(
    catchError(err => {
      if (err instanceof HttpErrorResponse) {
        switch (err.status) {
          case 401:
            // redirect to login
            // router.navigateByUrl('/login')
            console.log(err)
            break;
          default:
          case 404:
            // do something else:
            // - router redirect
            // - show notification
            // - dispatch an action: store.dispatch(...)
            // ...
            console.log(err)
            break;
        }
      }
      return of(err)
    })
  );

};