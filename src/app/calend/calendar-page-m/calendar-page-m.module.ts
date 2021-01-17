import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalendarPageMRoutingModule } from './calendar-page-m-routing.module';
import { CalendarPageMComponent } from './calendar-page-m.component';
import { CalendarComponent } from '../calendar/calendar.component';
import { MomentPipe } from 'src/app/pipes/moment.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarPageComponent } from '../calendar-page/calendar-page.component';
import { FirebaseService } from 'src/app/services/firebase.service';
import { TaskService } from 'src/app/services/task.service';
import { StoreModule } from '@ngrx/store';
import { CalendarReducer, CALENDAR_REDUCER_NODE } from '../store/reducers/calendar.reducers';
import { EffectsModule } from '@ngrx/effects';
import { CalendarEffects } from '../store/effects/calendar.effects';

@NgModule({
  declarations: [
    CalendarPageMComponent,
    CalendarComponent,
    CalendarPageComponent,
    MomentPipe,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    CalendarPageMRoutingModule,

    StoreModule.forFeature(CALENDAR_REDUCER_NODE, CalendarReducer),
    EffectsModule.forFeature([CalendarEffects]), 
  ],
  providers: [FirebaseService, TaskService],

})
export class CalendarPageMModule { }
