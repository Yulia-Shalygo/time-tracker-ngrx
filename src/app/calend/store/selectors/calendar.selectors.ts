// import { createFeatureSelector, createSelector } from "@ngrx/store";
// import { Task } from "../models/task.model";
// import { AppState } from "../state/app.state";

// export const selectTasks = createSelector(
//     (state: AppState) => state.tasks,
//     (tasks: Array<Task>) => tasks
// );

// export const selectTasksState = createFeatureSelector<AppState, ReadonlyArray<string>>("tasks");

// export const selectTaskCollection = createSelector(
//     selectTasks,
//     selectTasksState,
//     (tasks: Array<Task>, collection: Array<string>) => {
//         return collection.map((id) => tasks.find((task) => task.id === id));
//     }
// )