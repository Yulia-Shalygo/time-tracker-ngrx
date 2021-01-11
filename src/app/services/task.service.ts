import { Injectable } from '@angular/core';
import { Task } from '../interfaces/task';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import { DataSnapshot } from '@angular/fire/database/interfaces';

@Injectable({
  providedIn: 'root'
})

export class TaskService {
  static url: string = 'https://time-tracker-9eb9c-default-rtdb.firebaseio.com/tasks';

  constructor() { }

  create(task: Task): void { 
    firebase.database().ref(`tasks/${task.user}/${task.date}`).set(task).catch(error => {
      console.log(error);
    });
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
    return arr;
  }
}
