import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { from, of } from 'rxjs';
import { catchError, exhaustMap, map} from 'rxjs/operators';
import { FirebaseService } from 'src/app/services/firebase.service';
import { getUser, getUserError, getUserSuccess, logOut, logOutError, logOutSuccess, register, registerError, registerSuccess, signIn, signInError, signInSuccess } from '../actions/auth.actions';

@Injectable()
export class AuthEffects {
    constructor(
        private actions: Actions,
        private firebaseService: FirebaseService,
    ) {}

    signin = createEffect(()=>this.actions.pipe(
        ofType(signIn),
        exhaustMap((action) =>
            from(this.firebaseService.signin(action.user.email, action.user.password)).pipe(
                map(() => signInSuccess({ userId: this.firebaseService.getUser() })),
                catchError(error => {
                    alert("Your password doesn't match.");
                    return of(signInError(error));
                })
        )),
    ));

    regiser = createEffect(() => {
        return this.actions.pipe(
            ofType(register),
            exhaustMap((action) => 
                from(this.firebaseService.register(action.user.email, action.user.password)).pipe(
                    map(() => registerSuccess()),
                    catchError(error => {
                        alert("The email address is already in use.");
                        return of(registerError(error));
                    })
                )
            )
        );
    });

    logout = createEffect(() => {
        return this.actions.pipe(
            ofType(logOut),
            exhaustMap((action) => from(this.firebaseService.logout()).pipe(
                map(log =>logOutSuccess()),
                catchError((error) => of(logOutError(error)))
            ))
        );
    });

    getUser = createEffect(() => 
        this.actions.pipe(
            ofType(getUser),
            exhaustMap(() => of(this.firebaseService.getUser()).pipe(
                map((userId) => getUserSuccess({ userId: userId})),
                catchError((error) => of(getUserError(error)))
            ))
        )
    );

}