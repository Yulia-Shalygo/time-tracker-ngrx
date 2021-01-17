import { Task } from "../models/task.model";
import { State } from '../reducers/calendar.reducers';

export interface AppState {
    readonly tasks: State;
}