import { Component, OnInit } from '@angular/core';
import { FirebaseAuthService } from 'src/app/services/firebase-auth.service';
import { Subscription } from 'rxjs';
import {faSignOutAlt, faUserCog, faTachometerAlt, faKey} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  today = new Date();
  isLoggedIn: boolean;
  user;

  // Navigation bar icons
  faUserCog = faUserCog;
  faTachometerAlt = faTachometerAlt;
  faKey = faKey;
  faSignOutAlt = faSignOutAlt;

  isLoggedInSubscription: Subscription;


  constructor(private fas: FirebaseAuthService) { }

  ngOnInit() {
    this.isLoggedInSubscription = this.fas.authState.subscribe(res => {
      this.isLoggedIn = res ? true : false;
      this.user = res ? res : null;
    });

  }

  signout() {
    this.fas.signOut();
  }

  ngOnDestroy() {
    this.isLoggedInSubscription ? this.isLoggedInSubscription.unsubscribe() : null;
  }

}
