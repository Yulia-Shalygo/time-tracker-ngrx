import { createAction, props, union } from '@ngrx/store';

import { Task } from '../models/task.model';

export enum CalendarActionTypes {
    addTask = '[Task] Create Task',
    addTaskSuccess = '[Task] Create Task Success',
    addTaskError = '[Task] Create Task Error',

    readAllTasks = '[Task] Read All Tasks', 
    readAllTasksSuccess = '[Task] Read All Tasks Success', 
    readAllTasksError = '[Task] Read All Tasks Success', 
};

export const addTask = createAction(
    CalendarActionTypes.addTask,
    props<{ task: Task }>()
);

export const addTaskSuccess = createAction(
    CalendarActionTypes.addTaskSuccess,
    props<{ task: Task }>()
);

export const addTaskError = createAction(
    CalendarActionTypes.addTaskError,
    props<{ error: any }>()
);

export const readAllTasks = createAction(
    CalendarActionTypes.readAllTasks,
);

export const readAllTasksSuccess = createAction(
    CalendarActionTypes.readAllTasksSuccess,
    props<{ tasks: Task[] }>()
);

export const readAllTasksError = createAction(
    CalendarActionTypes.readAllTasksError,
    props<{ error: any }>()
);
