import { createFeatureSelector, createSelector } from "@ngrx/store";
import { State, TaskState, UserState } from "../state/app.state";

export const selectTasks = (state: TaskState) => state.tasks;
export const tasksSelector = createFeatureSelector('calendar');

export const userIdSelector = createFeatureSelector('auth');
export const selectUserId = createSelector(
    userIdSelector,
    (state: UserState) => state.userId
)

export const getTaskByDate = (date: string) => createSelector(
    tasksSelector, 
    (state: TaskState) => {
        const task = state.tasks.find((item) => item.date === date);
        if (task) {
            return task;
        } else {
            return null;
        }
    }
) 

export const errorSelector = createFeatureSelector('auth');
export const getError = createSelector(
    errorSelector,
    (state: State) => state.error
)