import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, exhaustMap, map} from 'rxjs/operators';
import { FirebaseService } from "src/app/services/firebase.service";
import * as authActions from '../actions/auth.actions';

@Injectable()
export class AuthEffects {
    constructor(
        private actions: Actions,
        private firebaseServiсe: FirebaseService
    ) {}

    signin = createEffect(()=> { 
        return this.actions.pipe(
            ofType(authActions.Signin),
            exhaustMap((action) => this.firebaseServiсe.signin(action.user.email, action.user.password).pipe(
                map(user => authActions.Signin(user)),
                catchError(() => of({type: authActions.SigninError}))
            )),
        )
    }, {dispatch: false});

    regiser = createEffect(() => {
        return this.actions.pipe(
            ofType(authActions.Register),
            exhaustMap((action) => this.firebaseServiсe.register(action.user.email, action.user.password).pipe(
                map(user => authActions.Register(user))
            ))
        )
    }, {dispatch: false});

    logout = createEffect(() => {
        return this.actions.pipe(
            ofType(authActions.Logout),
            exhaustMap((action) => this.firebaseServiсe.logout().pipe(
                map(log =>authActions.Logout())
            ))
        )
    }, {dispatch: false});
}