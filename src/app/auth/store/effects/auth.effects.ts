import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { from, of } from 'rxjs';
import { catchError, exhaustMap, map} from 'rxjs/operators';
import { FirebaseService } from 'src/app/services/firebase.service';
import { logOut, logOutError, logOutSuccess, register, registerError, registerSuccess, signIn, signInError, signInSuccess } from '../actions/auth.actions';

@Injectable()
export class AuthEffects {
    constructor(
        private actions: Actions,
        private firebaseService: FirebaseService
    ) {}

    signin = createEffect(()=>this.actions.pipe(
        ofType(signIn),
        exhaustMap((action) =>
            from(this.firebaseService.signin(action.user.email, action.user.password)).pipe(
                map(user => signInSuccess()),
                catchError(() => of(signInError()))
                //catchError(() => of({type: authActions.signInError}))
        )),
        
    ));

    regiser = createEffect(() => {
        return this.actions.pipe(
            ofType(register),
            exhaustMap((action) => 
                from(this.firebaseService.register(action.user.email, action.user.password)).pipe(
                    map(user => registerSuccess()),
                    catchError(() => of(registerError()))
            ))
        )
    });

    logout = createEffect(() => {
        return this.actions.pipe(
            ofType(logOut),
            exhaustMap((action) => from(this.firebaseService.logout()).pipe(
                map(log =>logOutSuccess()),
                catchError(() => of(logOutError()))
            ))
        )
    });
}