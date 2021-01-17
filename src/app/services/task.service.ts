import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import { DataSnapshot } from '@angular/fire/database/interfaces';
import { from, Observable, of } from 'rxjs';

import { Task } from '../calend/store/models/task.model';
import { DateService } from './date.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class TaskService {
  static url: string = 'https://time-tracker-9eb9c-default-rtdb.firebaseio.com/tasks';

  constructor(
    public dataService: DateService,
    private db: AngularFirestore
  ) { }

  create(task: Task): any { 
    return firebase.database().ref(`tasks/${task.user}/${task.date}`).set(task).catch(error => {
      console.log(error);
    })
  }
  readAll(): Task[] {
    let arr:Task[] = [];

    const userUID = firebase.auth().currentUser.uid; 

    firebase.database().ref(`tasks/${userUID}`) 
    .on('value', (data: DataSnapshot) => {
       data.forEach((child: DataSnapshot) => {
         arr.push(child.val());
       });
    });
    console.log(arr)
    return arr;
  }
}
