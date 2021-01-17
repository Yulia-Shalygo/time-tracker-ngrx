import { createAction, props } from '@ngrx/store';
import { User } from '../models/user.model';

export enum AuthActionTypes {
    signIn = '[Auth] SignIn',
    logOut = '[Auth] Logout',
    register = '[Auth] Register',

    signInError = '[Auth] SignIn Error',
    registerError = '[Auth] Register Error',
    logOutError = '[Auth] LogOut Error', 

    signInSuccess = '[Auth] SignIn Success',
    registerSuccess = '[Auth] Register Success',
    logOutSuccess = '[Auth] LogOut Success',
}

export const signIn = createAction(
    AuthActionTypes.signIn,
    props<{user: User}>()
);

export const register = createAction(
    AuthActionTypes.register,
    props<{user: User}>()
);

export const logOut = createAction(
    AuthActionTypes.logOut
);

export const signInSuccess = createAction(
    AuthActionTypes.signInSuccess
);

export const registerSuccess = createAction(
    AuthActionTypes.registerSuccess
);

export const logOutSuccess = createAction(
    AuthActionTypes.logOutSuccess
);

export const registerError = createAction(
    AuthActionTypes.registerError
);

export const signInError = createAction(
    AuthActionTypes.signInError
);

export const logOutError = createAction(
    AuthActionTypes.logOutError
);
