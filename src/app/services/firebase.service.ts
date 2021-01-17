import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/app';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  error: string;
  user: any;
  public currentUser: any;

  constructor(public fireAuth: AngularFireAuth, private router: Router) { }

  signin(email: string, password: string): any {
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
        alert("Your password doesn't match.");
        
        this.error = error;
        console.log(error);
        this.router.errorHandler(error);
      });
    
  }

  register(email: string, password: string): any {
    return this.fireAuth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() => {
        return this.fireAuth.createUserWithEmailAndPassword(email, password).then(res => {
          this.router.navigate(['/calendar']);
        }).catch((error) => {
          alert("The email address is already in use.");

          this.error = error;
          console.log(error);
          this.router.errorHandler(error);
        });
      });
    }; 

  logout():any {
    return firebase.auth().signOut().catch((error) => {
      console.log(error);
    });
  }
}
