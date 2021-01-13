
import { createReducer, on, Action } from '@ngrx/store';
import * as calendarActions from '../actions/calendar.actions';
import { Task } from '../models/task.model';

export const CALENDAR_REDUCER_NODE = 'calendar';

export interface State {
    task: Task;
}

const initialState: State = {
    task: null
 };

export const CalendarReducer = createReducer(
    initialState,
    on(calendarActions.AddTask, (state, action) => ({
        ...state,
        task: action.task
    }))
);

export function reducer(state: State | undefined, action: Action) {
    return CalendarReducer(state, action);
}