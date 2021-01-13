import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FirebaseService } from './services/firebase.service';

import { AngularFireModule } from '@angular/fire';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { environment } from '../environments/environment';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { CalendarPageMModule } from './calend/calendar-page-m/calendar-page-m.module';
import { AuthModule } from './auth/auth.module';
import { EffectsModule } from '@ngrx/effects';
import { CommonModule } from '@angular/common';  

@NgModule({
  declarations: [
    AppComponent,
    // AuthComponent,
    // LoginComponent,
    // RegisterComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,

    AuthModule,
    
    AngularFireModule.initializeApp(environment.firebase),
    
    EffectsModule.forRoot([]), //AuthEffects
    StoreModule.forRoot({}, {
      runtimeChecks: {
        strictActionImmutability: true,
        strictStateImmutability: true
      }
    }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    // CalendarPageMModule
  ],
  providers: [FirebaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
