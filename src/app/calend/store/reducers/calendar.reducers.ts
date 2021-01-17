import { createReducer, on, Action } from '@ngrx/store';
import { logOut } from 'src/app/auth/store/actions/auth.actions';
import { addTaskSuccess, readAllTasksSuccess } from '../actions/calendar.actions';
import { tasksInitialState, TaskState } from '../state/app.state';

export const CALENDAR_REDUCER_NODE = 'calendar';

export const CalendarReducer = createReducer(
    tasksInitialState,

    on(readAllTasksSuccess, (state, { tasks }) => ({
        tasks: tasks
    })),

    on(addTaskSuccess, (state, { task }) => ({
        tasks: [...state.tasks, task]
    })),

    on(logOut, (state, action) => ({
        tasks: []
    })),
);

export function reducer(state: TaskState | undefined, action: Action) {
    return CalendarReducer(state, action);
}
