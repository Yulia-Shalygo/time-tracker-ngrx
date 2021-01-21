import { Task } from '../models/task.model';

export const authInitialState: UserState = {
   userId: ''
};

export const tasksInitialState: TaskState = {
  tasks: []
};

export interface UserState {
  userId: string;
}

export interface TaskState {
  tasks: Task[];
}

export interface State {
  user: UserState;
  task: TaskState;
  error: any;
}