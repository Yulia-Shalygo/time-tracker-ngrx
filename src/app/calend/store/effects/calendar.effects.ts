import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, mergeMap, switchMap } from 'rxjs/operators';
import { TaskService } from 'src/app/services/task.service';
import { from, of } from 'rxjs';

import { addTask, addTaskError, addTaskSuccess, readAllTasks, readAllTasksError, readAllTasksSuccess } from '../actions/calendar.actions';
import { FirebaseService } from 'src/app/services/firebase.service';

@Injectable()
export class CalendarEffects {
    constructor(
        private action: Actions,
        private taskServiсe: TaskService,
    ) {}

    addTask = createEffect(() => this.action.pipe(
        ofType(addTask),
        exhaustMap(({ task }) => 
            from(this.taskServiсe.create(task)).pipe(
                map(() => addTaskSuccess({ task })),
                catchError((error) => of(addTaskError(error)))
            )
        )
    ));

    readAllTasks = createEffect(() => this.action.pipe(
        ofType(readAllTasks),
        exhaustMap(() => 
            from(this.taskServiсe.readAll()).pipe(
                map((tasks) => readAllTasksSuccess({ tasks })),
                catchError((error) => of(readAllTasksError({ error })))
            )
        )
    ));
}