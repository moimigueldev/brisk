import { Component, OnInit } from '@angular/core';
import { GetIPAdressService } from 'src/app/services/get-ipadress.service';
import { Subscription } from 'rxjs';
import { FirebaseAuthService } from 'src/app/services/firebase-auth.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  userSubscription: Subscription;


  constructor(
    private fas: FirebaseAuthService,
    private getIpService: GetIPAdressService
  ) { }

  ngOnInit() {
  }

  // tslint:disable-next-line: use-life-cycle-interface
}