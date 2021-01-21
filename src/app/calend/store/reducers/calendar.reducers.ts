import { createReducer, on, Action } from '@ngrx/store';
import { logOutSuccess } from 'src/app/auth/store/actions/auth.actions';
import { addTaskError, addTaskSuccess, readAllTasksError, readAllTasksSuccess } from '../actions/calendar.actions';
import { tasksInitialState, TaskState } from '../state/app.state';

export const CALENDAR_REDUCER_NODE = 'calendar';

export const CalendarReducer = createReducer(
    tasksInitialState,

    on(readAllTasksSuccess, (state, { tasks }) => ({
        tasks: tasks
    })),

    on(readAllTasksError, (state, action) => ({
        ...state,
        error: action.error
    })),

    on(addTaskSuccess, (state, { task }) => ({
        tasks: [...state.tasks, task]
    })),

    on(addTaskError, (state, action) => ({
        ...state,
        error: action.error.message
    })),

    on(logOutSuccess, () => ({
        tasks: []
    })),
);

export function reducer(state: TaskState | undefined, action: Action) {
    return CalendarReducer(state, action);
}
