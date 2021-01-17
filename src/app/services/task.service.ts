import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

import { Task } from '../calend/store/models/task.model';
import { DateService } from './date.service';
import { Store } from '@ngrx/store';
import { selectUserId } from '../calend/store/selectors/calendar.selectors';

@Injectable({
  providedIn: 'root'
})

export class TaskService {
  static url: string = 'https://time-tracker-9eb9c-default-rtdb.firebaseio.com/tasks';

  userUID: string;

  constructor(
    public dataService: DateService,
    private store: Store
  ) { }

  create(task: Task): any { 
    return firebase.database().ref(`tasks/${task.user}/${task.date}`).set(task).catch(error => {
      console.log(error);
    })
  }

  async readAll(): Promise<Task[]> {
    await this.store.select(selectUserId).subscribe((id) => this.userUID = id);
    const snapshot = await firebase.database().ref(`tasks/${ this.userUID }`).once('value');
    
    return Object.values(snapshot.val() || {});
  }
}
