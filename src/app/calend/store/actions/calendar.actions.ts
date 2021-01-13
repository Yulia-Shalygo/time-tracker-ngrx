import { Action, createAction, props } from '@ngrx/store';

import { Task } from '../models/task.model';

export enum CalendarActionTypes {
    AddTask = '[Task/Create] Create Task',
};

export const AddTask = createAction(
    CalendarActionTypes.AddTask,
    props<{task: Task}>()
);