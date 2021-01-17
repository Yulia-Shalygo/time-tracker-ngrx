import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthEffects } from './store/effects/auth.effects';
import { AUTH_REDUCER_NODE, reducer } from './store/reducers/auth.reducers';
import { CommonModule } from '@angular/common';  

@NgModule({
    declarations: [
        AuthComponent,
        LoginComponent,
        RegisterComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        HttpClientModule,

        EffectsModule.forFeature([AuthEffects]), 
        StoreModule.forFeature(AUTH_REDUCER_NODE, reducer)
    ],
    providers: []
})
export class AuthModule { }