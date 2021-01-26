import { Action, createReducer, on, } from '@ngrx/store';
import { getUserError, getUserSuccess, logOutError, logOutSuccess, registerError, registerSuccess, signInError, signInSuccess } from '../actions/auth.actions';
import { authInitialState, UserState } from 'src/app/calend/store/state/app.state';

export const AUTH_REDUCER_NODE = 'auth';

export const AuthReducer = createReducer(
    authInitialState, 
    on(logOutSuccess, () => ({
        ...authInitialState
    })),

    on(logOutError, (state, action) => ({
        ...state,
        errorMessage: action.error.message
    })),

    on(signInSuccess, (state, action) => ({
        userId: action.userId
    })),

    on(signInError, (state, action) => ({
        ...state,
        errorCode: action.error.code,
    })),

    on(registerSuccess, (state, action) => ({
        userId: action.userId
    })),

    on(registerError, (state, action) => ({
        ...state,
        errorCode: action.error.code,
    })),

    on(getUserSuccess, (state, action) => ({
        userId: action.userId
    })),

    on(getUserError, (state, action) => ({
        ...state,
        errorCode: action.error.code,
    })),

);

export function reducerAuth(state: UserState | undefined, action: Action) {
    return AuthReducer(state, action);
}