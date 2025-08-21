import { inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

import { catchError, map, mergeMap, of, tap } from 'rxjs';

import { Actions, createEffect, ofType, rootEffectsInit } from '@ngrx/effects';

import { environment } from '../../../../environments/environment';

import { AuthActions } from './auth.actions';

export const syncWithLocalStorage = createEffect((
    actions$ = inject(Actions),
) => {
    return actions$.pipe(
        ofType(rootEffectsInit),
        map(() => {
            const token = localStorage.getItem('token')
            const displayName = localStorage.getItem('displayName')
            return AuthActions.initialize({ token, displayName });
        }),
        catchError((err) => {
            console.log(err);
            return of(AuthActions.initialize({ token: null, displayName: null }));
        })
    );
},
    { functional: true }
);

export const login = createEffect(
    (
        actions$ = inject(Actions),
        http = inject(HttpClient)
    ) => {
        return actions$.pipe(
            // Handle `login` action
            ofType(AuthActions.login),
            // subscribe the inner (http) observable
            mergeMap((action) => {
                // create the parameters to send with the request
                // username and password are acquired by the action payload
                const params = new HttpParams()
                    .set('username', action.username)
                    .set('password', action.password)

                const loginDto = { username: action.username, password: action.password };

                // make the http request passing the parameters "{ username: ..., password: ...}"
                /* return http.get<{ token: string }>(`${environment.baseApiUrl}/login`, { params }) */
                return http.post<{ token: string }>(`${environment.apiBaseUrl}/auth/login`, loginDto)
                    .pipe(
                        tap((res) => {
                            localStorage.setItem('token', res.token);
                        }),
                        map((res) =>
                            // dispatch the "loginSuccess" action passing the "token" as payload
                            AuthActions.loginSuccess({ token: res.token })
                        ),
                        catchError(() =>
                            // dispatch the "loginFail" action
                            of(AuthActions.loginFail())
                        )
                    )
            })
        );
    },
    { functional: true }
);


export const loginSuccess = createEffect(
    (
        actions$ = inject(Actions),
        http = inject(HttpClient)
    ) => {
        return actions$.pipe(
            // wait the loginSuccess action
            ofType(AuthActions.loginSuccess),
            mergeMap((action) =>
                // get the profile passing the token, that is retrieved by the action payload
                http.get<{ displayName: string }>(`${environment.apiBaseUrl}/profile`, {
                    headers: {
                        Authorization: `Bearer ${action.token}`
                    }
                })
                    .pipe(
                        tap((res) => {
                            localStorage.setItem('displayName', res.displayName)
                        }),
                        // dispatch the getProfileSuccess action is success,
                        // passing the displayName as payload
                        map((res) =>
                            AuthActions.getProfileSuccess({ displayName: res.displayName })
                        ),
                        // dispatch the getProfileFail in case of errors
                        catchError(() =>
                            of(AuthActions.getProfileFail())
                        )
                    )
            )
        );
    },
    { functional: true }
);


export const getProfileSuccess = createEffect(
    (
        actions$ = inject(Actions),
        router = inject(Router)
    ) => {
        return actions$.pipe(
            ofType(AuthActions.getProfileSuccess),
            // redirect
            tap(() => {
                router.navigateByUrl('cms')
            })
        );
    },
    // dispatch: false => this effect does not dispatch an action
    { functional: true, dispatch: false }
);


export const logout = createEffect((
    actions$ = inject(Actions),
    router = inject(Router)
) => {
    return actions$.pipe(
        ofType(AuthActions.logout),
        tap(() => {
            // delete local storage
            localStorage.removeItem('token')
            localStorage.removeItem('displayName')
            // redirect
            router.navigateByUrl('shop')
        })
    );
},
    { functional: true, dispatch: false }
);