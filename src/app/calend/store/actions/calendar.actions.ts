import { Action } from '@ngrx/store';

import { Task } from '../models/task.model';

export enum CalendarActionTypes {
    AddTask = '[Task/Create] Create Task',
};

export class AddTask implements Action {
    readonly type = CalendarActionTypes.AddTask;

    constructor(public payload: {task: Task}) {}
}

export type TaskUnion = AddTask;