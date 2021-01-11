import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  error: string;
  user: any;
  public currentUser: any;

  constructor(public fireAuth: AngularFireAuth, private router: Router) { }

  signin(email: string, password: string): Promise<void> {
    return this.fireAuth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() => {
      return this.fireAuth.signInWithEmailAndPassword(email, password).then(res => {
        this.user =  firebase.auth().currentUser;
        this.router.navigate(['/calendar']);
      }).catch((error) => {
        this.error = error;
        console.log(error);
        this.router.errorHandler(error);
      });
    }).catch((error) => {
      this.error = error;
      console.log(error);
      this.router.errorHandler(error);
    });
  }

  async register(email: string, password: string): Promise<void> {
    await this.fireAuth.createUserWithEmailAndPassword(email, password).then(res => {
      this.router.navigate(['/calendar']);
    }).catch((error) => {
      this.error = error;
      console.log(error);
      this.router.errorHandler(error);
    });
  } 

  logout(): void {
    firebase.auth().signOut().catch((error) => {
      console.log(error);
    });
  }
}
