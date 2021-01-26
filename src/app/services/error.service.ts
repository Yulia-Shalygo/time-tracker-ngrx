import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor() { }

  getErrorString(errorCode: string): string {
    switch (errorCode) {
      case 'auth/too-many-requests': return 'Too many requests.';
      case 'auth/wrong-password': return 'Wrong password.';
      case 'auth/user-not-found': return 'User not found.';
      case 'auth/email-already-in-use': return 'Account with this email address already exists.';
      default: return 'Something wrong happened.'
    }
  }
}
