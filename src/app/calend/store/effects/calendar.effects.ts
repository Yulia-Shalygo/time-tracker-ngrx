import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, mergeMap, switchMap } from 'rxjs/operators';
import { TaskService } from 'src/app/services/task.service';
import { from, of } from 'rxjs';

import { addTask, addTaskError, addTaskSuccess, readAllTasks, readAllTasksError, readAllTasksSuccess } from '../actions/calendar.actions';

@Injectable()
export class CalendarEffects {
    constructor(
        private action: Actions,
        private taskServiсe: TaskService
    ) {}

    addTask = createEffect(() => this.action.pipe(
        ofType(addTask),
        exhaustMap((action) => 
            from(this.taskServiсe.create(action.task)).pipe(
                map(() => addTaskSuccess()),
                catchError((error) => of(addTaskError(error)))
            )
        )
    ));

    readAllTasks = createEffect(() => this.action.pipe(
        ofType(readAllTasks),
        switchMap((action) => 
            of(this.taskServiсe.readAll()).pipe(
                map((tasks) => readAllTasksSuccess({ tasks })),
                catchError((error) => of(readAllTasksError({ error })))
            )
        )
    
    ))
}