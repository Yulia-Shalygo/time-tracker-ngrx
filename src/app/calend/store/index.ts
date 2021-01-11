import { ActionReducerMap } from '@ngrx/store';
import * as tasks from './reducers/calendar.reducers';

export interface State {
    tasks: tasks.State;
}

export const reducers: ActionReducerMap<State> = {
    tasks: tasks.reducer
} 