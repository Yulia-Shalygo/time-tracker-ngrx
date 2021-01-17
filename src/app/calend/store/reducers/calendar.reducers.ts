
import { state } from '@angular/animations';
import { act } from '@ngrx/effects';
import { createReducer, on, Action, createSelector } from '@ngrx/store';
import { addTask, addTaskError, readAllTasks, readAllTasksSuccess } from '../actions/calendar.actions';
import { Task } from '../models/task.model';
import { AppState } from '../state/app.state';

export const CALENDAR_REDUCER_NODE = 'calendar';

// reducers
export interface State {
    tasks: Task[],
    error: Error
}

const initialState: State = {
    tasks: [],
    error: undefined
 };


export const CalendarReducer = createReducer(
    initialState,

    on(readAllTasks, (state, action) => ({
        ...state,
    })),
    on(readAllTasksSuccess, (state, {tasks}) => ({
        ...state,
        allTasks: tasks
    })),

    on(addTask, (state, action) => ({
        ...state,
        // tasks: [
        //     ...state.tasks,
        //     {
        //         task: action.task
        //     }
        // ]
    })),

  /* ++
    on(calendarActions.readAllTasksSuccess, (state, {tasks}) => (
         {
        
        ...state,
        tasks: tasks
       // tasks: action.tasks// action.tasks
    })),
*/

    // on(calendarActions.addTaskSuccess, (state, action) => ({
    //     ...state,
    //     name: 'Succ'
    // })),
    on(addTaskError, (state) => ({
        ...state,
    }))

);

export function reducer(state: State | undefined, action: Action) {
    return CalendarReducer(state, action);
}

const getTaskFeatureState = (state: AppState) => state.tasks;

export const getTasks = createSelector(
    getTaskFeatureState,
    (state: State) => state.tasks
)