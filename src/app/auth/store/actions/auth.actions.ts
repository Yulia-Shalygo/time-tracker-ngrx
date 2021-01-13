import { createAction, props } from '@ngrx/store';
import { User } from '../models/user.model';

export enum AuthActionTypes {
    Signin = '[Auth] Signin',
    Logout = '[Auth] Logout',

    Register = '[Auth] Register',

    Signin_error = '[Auth] Signin Error'
}

export const Signin = createAction(
    AuthActionTypes.Signin,
    props<{user: User}>()
);

export const Register = createAction(
    AuthActionTypes.Register,
    props<{user: User}>()
);

export const Logout = createAction(
    AuthActionTypes.Logout
);

export const SigninError = createAction(
    AuthActionTypes.Signin_error
);