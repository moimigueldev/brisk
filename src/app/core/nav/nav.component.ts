import { Component, OnInit } from '@angular/core';
import { FirebaseAuthService } from 'src/app/services/firebase-auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {


  today = new Date();
  isLoggedIn:boolean;
  user;

  isLoggedInSubscription: Subscription;
  

  constructor(private fas: FirebaseAuthService) { }

  ngOnInit() {
    this.isLoggedInSubscription = this.fas.authState.subscribe(res => {
      this.isLoggedIn =  res? true: false;
      this.user = res? res: null;
    });
    
  }

  signout() {
    this.fas.signOut();
  }

  ngOnDestroy() {
    this.isLoggedInSubscription? this.isLoggedInSubscription.unsubscribe() : null;
  }

}
 