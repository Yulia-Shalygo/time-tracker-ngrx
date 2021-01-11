import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { DateService } from 'src/app/services/date.service';
import { Week  } from '../../interfaces/week';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/interfaces/task';
import firebase from 'firebase/app';
import { Store } from '@ngrx/store';
import { AddTask } from '../store/actions/calendar.actions';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  userUID: any;

  calendar: Week[];

  modal: boolean = false;
  calendarForm: FormGroup;

  arr: Task[] = [];
  finTask: Task[] = [];
  tempArr: any;

  tempTask: Task = {
    description: '',
    time: '',
    date: '',
    user: ''
  };

  constructor(
    public dataService: DateService, 
    public taskService: TaskService,
    private store$: Store
  ) { }

  ngOnInit(): void {
    this.dataService.date.subscribe(this.calend.bind(this));
    this.calendarForm = new FormGroup({
      hours: new FormControl(null,
        [Validators.required,  Validators.max(24), Validators.min(0)]),
      description: new FormControl(null,
        [Validators.required])
    })
    this.finTask = this.taskService.readAll();
  }

  calend(curDate: moment.Moment): void {
    let calendar: any = [];

    const start: moment.Moment = curDate.clone().startOf('month').startOf('week');
    const end: moment.Moment = curDate.clone().endOf('month').endOf('week');
    const date: moment.Moment = start.clone().subtract(0, 'day');
    
    while (date.isBefore(end, 'day')) {
      calendar.push({
          days: Array(7).fill(0).map(() =>  {
            const value = date.add(1, 'day').clone();
            const active = moment().isSame(value, 'date');
            const selected = curDate.isSame(value, 'date');
            const disable = !curDate.isSame(value, 'month');

            return { value, active, selected, disable };
          })         
      });
    }
    this.calendar = calendar;
  }

  minusMonth(): void {
    this.dataService.minusMonth();
  }

  plusMonth(): void {
    this.dataService.plusMonth();
  }

  changeModal(day: moment.Moment): void {
    this.modal = true;
    this.dataService.changeDate(day);

    this.readTaskForModal();
  }

  closeModal(): void {
    this.modal = false;
    this.calendarForm.reset();
  }

  submit(): void {
    const { description, hours } = this.calendarForm.value;

    this.userUID = firebase.auth().currentUser.uid;

    const task: Task = {
      date: this.dataService.date.value.format('YYYY-MM-DD'),
      description,
      time: hours,
      user: this.userUID
    };

    this.store$.dispatch(new AddTask({ task }))

    this.taskService.create(task);
    this.calendarForm.reset();
    this.modal = false;
  }

  readTaskForModal(): void {
    this.userUID = firebase.auth().currentUser.uid;

    this.tempArr = this.finTask.filter(item => item.user === this.userUID).filter(item => item.date === this.dataService.date.value.format("YYYY-MM-DD"));
    if (this.tempArr.length) {
      this.tempArr.map((item) => {
        this.tempTask.description = item.description;
        this.tempTask.time = item.time;
        this.tempTask.date = item.date;
        this.tempTask.user = item.user;
      });
    } else {
      this.tempTask.description = '';
      this.tempTask.time = '';
      this.tempTask.date = '';
      this.tempTask.user = '';
    }
  }
}
