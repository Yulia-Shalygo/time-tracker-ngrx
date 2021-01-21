import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { TaskService } from 'src/app/services/task.service';
import { from, of, pipe } from 'rxjs';

import { addTask, addTaskError, addTaskSuccess, readAllTasks, readAllTasksError, readAllTasksSuccess } from '../actions/calendar.actions';
import { FirebaseService } from 'src/app/services/firebase.service';

@Injectable()
export class CalendarEffects {
    constructor(
        private action: Actions,
        private taskService: TaskService,
        private firebaseService: FirebaseService,
    ) {}

    addTask = createEffect(() => this.action.pipe(
        ofType(addTask),
        exhaustMap(({ task }) => from(this.taskService.create(task)).pipe(
            map(() => addTaskSuccess({ task })),
            catchError((error) => of(addTaskError({ error })))
        ))
    ));

    readAllTasks = createEffect(() => this.action.pipe(
        ofType(readAllTasks),
        pipe(
            map(() => this.firebaseService.getUser()),
            exhaustMap((userId) => from(this.taskService.readAll(userId)).pipe(
                map((tasks) => readAllTasksSuccess({ tasks })),
                catchError((error) => of(readAllTasksError({ error })))
            ))
        ),  
    ));
}