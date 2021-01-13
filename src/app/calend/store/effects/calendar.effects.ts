import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as calendarActions from '../actions/calendar.actions';
import { exhaustMap, map } from "rxjs/operators";
import { TaskService } from "src/app/services/task.service";


@Injectable()
export class CalendarEffects {
    constructor(
        private action: Actions,
        private taskServiсe: TaskService
    ) {}

    addTask = createEffect(() => {
        return this.action.pipe(
            ofType(calendarActions.AddTask),
            exhaustMap((action) => this.taskServiсe.create(action.task).pipe(
                map(task => calendarActions.AddTask(task))
            ))
        )
    }, {dispatch: false});
}