import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { getError } from 'src/app/calend/store/selectors/calendar.selectors';
import { FirebaseService } from '../../services/firebase.service';
import { register } from '../store/actions/auth.actions';
import { User } from '../store/models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formRegister: FormGroup;
  err: boolean = false;

  subscription: Subscription;

  constructor(
    public firebaseService: FirebaseService,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.formRegister = new FormGroup({
      email: new FormControl(null, 
        [Validators.required, Validators.email]),
      password1: new FormControl(null, 
        [Validators.minLength(6), Validators.required ]),
      password2: new FormControl(null, 
        [Validators.minLength(6), Validators.required ])
    })
  }

  onSubmit(): void {
    console.log(this.formRegister.value);
  }

  async onSignup(email: string, password: string): Promise<void> {

    const user: User = {
      email,
      password
    };

    this.subscription = this.store.pipe(select(getError)).subscribe(error => {
      if (error) {
        this.err = true;
      }
    });

    this.store.dispatch(register({ user }));
  }
}
