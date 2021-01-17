import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { FirebaseService } from '../../services/firebase.service';
import { signIn } from '../store/actions/auth.actions';
import { User } from '../store/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  err = false;
  userId: any;

  constructor(
    public firebaseServiсe: FirebaseService,
    private store: Store     
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, 
        [Validators.required, Validators.email]),
      password: new FormControl(null, 
        [Validators.minLength(6), Validators.required])
    })
  }

  async signin(email: string, password: string): Promise<void> {
   
    const user: User = {
      email,
      password
    };
    this.store.dispatch(signIn({ user }));

    this.loginForm.reset();
    this.loginForm.enable();
  }
}
