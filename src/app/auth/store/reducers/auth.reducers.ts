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
        error: action.error.message
    })),

    on(signInSuccess, (state, action) => ({
        userId: action.userId
    })),

    on(signInError, (state, action) => ({
        ...state,
        error: action.error.message
    })),

    on(registerSuccess, (state, action) => ({
        userId: action.userId
    })),

    on(registerError, (state, action) => ({
        ...state,
        error: action.error.message
    })),

    on(getUserSuccess, (state, action) => ({
        userId: action.userId
    })),

    on(getUserError, (state, action) => ({
        ...state,
        error: action.error.message
    })),

);

export function reducerAuth(state: UserState | undefined, action: Action) {
    return AuthReducer(state, action);
}