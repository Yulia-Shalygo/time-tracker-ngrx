import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

import { Task } from '../calend/store/models/task.model';
import { DateService } from './date.service';

@Injectable({
  providedIn: 'root'
})

export class TaskService {
  static url: string = 'https://time-tracker-9eb9c-default-rtdb.firebaseio.com/tasks';

  constructor(
    public dataService: DateService,
  ) { }

  create(task: Task): any { 
    return firebase.database().ref(`tasks/${task.user}/${task.date}`).set(task);
  }

  async readAll(userId: string): Promise<Task[]> {
    const snapshot = await firebase.database().ref(`tasks/${ userId }`).once('value');
    return Object.values(snapshot.val() || {});
  }
}
