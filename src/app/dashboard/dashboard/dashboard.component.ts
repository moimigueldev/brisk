import { Component, OnInit } from '@angular/core';
import { GetIPAdressService } from 'src/app/services/get-ipadress.service';
import { Subscription } from 'rxjs';
import { FirebaseAuthService } from 'src/app/services/firebase-auth.service';
import { WeatherService } from 'src/app/services/weather.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  userSubscription: Subscription;

  constructor(
    private weatherService: WeatherService
  ) { }

  ngOnInit() {

  }

  // tslint:disable-next-line: use-life-cycle-interface
}
