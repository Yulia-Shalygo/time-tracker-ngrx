import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Logout } from 'src/app/auth/store/actions/auth.actions';

import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-header-calend',
  templateUrl: './header-calend.component.html',
  styleUrls: ['./header-calend.component.css']
})
export class HeaderCalendComponent implements OnInit {

  constructor(
    public firebaseService: FirebaseService,
    private router: Router,
    private store: Store
  ) { }

  ngOnInit(): void {
  }

  logout(): void { 
    this.store.dispatch(Logout());
    this.router.navigate(['/login']);
  }
}
