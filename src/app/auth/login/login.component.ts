import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  err = false;
  userId: any;

  constructor(public firebaseServiсe: FirebaseService) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, 
        [Validators.required, Validators.email]),
      password: new FormControl(null, 
        [Validators.minLength(6), Validators.required])
    })
  }

  async signin(email: string, password: string): Promise<void> {
    this.loginForm.disable();

    await this.firebaseServiсe.signin(email, password)
      .catch(error => {      
        this.loginForm.reset();
        this.loginForm.enable();
        this.err = true;
      })
  }
}
