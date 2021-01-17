import { Action, createReducer, on, } from '@ngrx/store';
import { getUserSuccess, logOut, signInSuccess } from '../actions/auth.actions';
import { authInitialState, UserState } from 'src/app/calend/store/state/app.state';

export const AUTH_REDUCER_NODE = 'auth';

export const AuthReducer = createReducer(
    authInitialState, 
    on(logOut, () => ({
        userId: null,
    })),

    on(signInSuccess, (state, action) => ({
        userId: action.userId
    })),

    on(getUserSuccess, (state, action) => ({
        userId: action.userId
    })),
);

export function reducerAuth(state: UserState | undefined, action: Action) {
    return AuthReducer(state, action);
}