import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  error: string;
  user: any;
  public currentUser: any;

  constructor(
    public fireAuth: AngularFireAuth,
    private router: Router,
  ) { }

  async signin(email: string, password: string): Promise<string> {   
    await this.fireAuth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() => {
        return this.fireAuth.signInWithEmailAndPassword(email, password).then(() => {
          this.user =  firebase.auth().currentUser.uid;
          this.router.navigate(['/calendar']);
        });
    });
     return this.user;
  }

  async register(email: string, password: string): Promise<string> {
    await this.fireAuth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() => {
      return this.fireAuth.createUserWithEmailAndPassword(email, password).then(() => {
        this.user = firebase.auth().currentUser.uid;
        this.router.navigate(['/calendar']);
      });
    });
    return this.user;
  }; 

  logout(): any {
    return firebase.auth().signOut();
  }

  getUser(): string {
    return firebase.auth().currentUser.uid;
  }
}
