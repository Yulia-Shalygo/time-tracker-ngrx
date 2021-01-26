import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { TaskService } from 'src/app/services/task.service';
import { from, of } from 'rxjs';
import { addTask, addTaskError, addTaskSuccess, readAllTasks, readAllTasksError, readAllTasksSuccess } from '../actions/calendar.actions';
import { Store } from '@ngrx/store';
import { selectUserId } from '../selectors/calendar.selectors';

@Injectable()
export class CalendarEffects {
    constructor(
        private action: Actions,
        private taskService: TaskService,
        private store: Store
    ) {}

    usId: string;

    addTask = createEffect(() => this.action.pipe(
        ofType(addTask),
        exhaustMap(({ task }) => from(this.taskService.create(task)).pipe(
            map(() => addTaskSuccess({ task })),
            catchError((error) => of(addTaskError({ error })))
        ))
    ));

    readAllTasks = createEffect(() => this.action.pipe(
        ofType(readAllTasks),
        withLatestFrom(this.store.select(selectUserId)),
        switchMap(([action, userId]) => from(this.taskService.readAll(userId)).pipe(
            map((tasks) => readAllTasksSuccess({ tasks })),
            catchError((error) => of(readAllTasksError({ error })))
        ))
    ))
}