import { createAction, props } from '@ngrx/store';
import { User } from '../models/user.model';

export enum AuthActionTypes {
    signIn = '[Auth] SignIn',
    signInSuccess = '[Auth] SignIn Success',
    signInError = '[Auth] SignIn Error',

    
    register = '[Auth] Register',
    registerSuccess = '[Auth] Register Success',
    registerError = '[Auth] Register Error',

    logOut = '[Auth] Logout',
    logOutSuccess = '[Auth] LogOut Success',
    logOutError = '[Auth] LogOut Error', 

    getUser = '[Auth] Get User',
    getUserSuccess = '[Auth] Get User Success',
    getUserError = '[Auth] Get User Error'
}

export const getUser = createAction(
    AuthActionTypes.getUser
);

export const getUserSuccess = createAction(
    AuthActionTypes.getUserSuccess,
    props<{userId: string}>()
);

export const getUserError = createAction(
    AuthActionTypes.getUserError,
    props<{ error: any }>()
);

export const signIn = createAction(
    AuthActionTypes.signIn,
    props<{user: User}>()
);

export const signInSuccess = createAction(
    AuthActionTypes.signInSuccess,
    props<{userId: string}>()
);

export const signInError = createAction(
    AuthActionTypes.signInError,
    props<{ error: any }>()
);

export const register = createAction(
    AuthActionTypes.register,
    props<{user: User}>()
);

export const registerSuccess = createAction(
    AuthActionTypes.registerSuccess,
    props<{userId: string}>()
);

export const registerError = createAction(
    AuthActionTypes.registerError,
    props<{ error: any }>()
);

export const logOut = createAction(
    AuthActionTypes.logOut
);

export const logOutSuccess = createAction(
    AuthActionTypes.logOutSuccess
);

export const logOutError = createAction(
    AuthActionTypes.logOutError,
    props<{ error: any }>()
);
