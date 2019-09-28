import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FirebaseAuthService } from 'src/app/services/firebase-auth.service';
import { WeatherService } from 'src/app/services/weather.service';
import { ActivatedRoute } from '@angular/router';
import { GetIPAdressService } from 'src/app/services/get-ipadress.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  userSubscription: Subscription;
  zipcode;

  constructor(
    private weatherService: WeatherService,
    private fas: FirebaseAuthService,
    private route: ActivatedRoute,
    private getIp: GetIPAdressService
  ) { }

  hide = false;
  hideSubscription: Subscription;

  ngOnInit() {

    this.getIp.getIpAddressService();

   this.hideSubscription =  this.weatherService.humidityWind.subscribe(res => {
      this.zipcode = res[0].zipcode;
      this.hide = true;
    });
  }

  saveCity() {
    this.fas.addZipcode(this.zipcode || this.route.children[0].params['_value'].zipcode);
  }

  ngOnDestroy() {
    this.hideSubscription ? this.hideSubscription.unsubscribe() : null;
  }
}
