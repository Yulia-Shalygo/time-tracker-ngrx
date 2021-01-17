import { User } from '../models/user.model';
import * as authActions from '../actions/auth.actions';
import { Action, createReducer, on, } from '@ngrx/store';

export const AUTH_REDUCER_NODE = 'auth';

export interface State {
    user: User;
}

const  initialState: State = {
    user: null,
};

export const AuthReducer = createReducer(
    initialState, 
    on(authActions.signIn, (state, action) => ({
        ...state,
        user: action.user        
    })),
    on(authActions.logOut, (state, action) => ({
        ...state
    }))
);

export function reducer(state: State | undefined, action: Action) {
    return AuthReducer(state, action);
}