import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalendarPageMRoutingModule } from './calendar-page-m-routing.module';
import { CalendarPageMComponent } from './calendar-page-m.component';
import { CalendarComponent } from '../calendar/calendar.component';
import { MomentPipe } from 'src/app/pipes/moment.pipe';
import { HeaderCalendComponent } from '../header-calend/header-calend.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarPageComponent } from '../calendar-page/calendar-page.component';
import { FirebaseService } from 'src/app/services/firebase.service';
import { TaskService } from 'src/app/services/task.service';
import { StoreModule } from '@ngrx/store';
import { reducer } from '../store/reducers/calendar.reducers';

@NgModule({
  declarations: [
    CalendarPageMComponent,
    CalendarComponent,
    CalendarPageComponent,
    MomentPipe,
    HeaderCalendComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    CalendarPageMRoutingModule,

    StoreModule.forFeature('calendar', reducer),
    // EffectsModule.forFeature([CalendarEffect]), 
  ],
  providers: [FirebaseService, TaskService],

})
export class CalendarPageMModule { }
