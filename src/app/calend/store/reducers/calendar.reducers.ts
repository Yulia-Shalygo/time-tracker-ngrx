import { Task } from "src/app/interfaces/task";

import * as calendarActions from '../actions/calendar.actions';
import { TaskUnion } from "../actions/calendar.actions";

// export type Action = calendarActions.TaskUnion;

export interface State {
    task: Task[];
}

const initialState: State = {
    task: [],
 };

export const reducer = (state: State = initialState, action: TaskUnion) => {
    switch(action.type) {
        case calendarActions.CalendarActionTypes.AddTask: {
            return {
                ...state,
               // tasks: action.payload.task
               tasks: [
                   ...state.task,
                   {
                       name: action.payload.task
                   }
               ]
            };
        };
        default: return state;
    }
}