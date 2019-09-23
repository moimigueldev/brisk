import { Component, OnInit } from '@angular/core';
import { WeatherService } from 'src/app/services/weather.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-weekly-forcast',
  templateUrl: './weekly-forcast.component.html',
  styleUrls: ['./weekly-forcast.component.scss']
})
export class WeeklyForcastComponent implements OnInit {

  weeklyForcastData = [];

  weatherForcastSubscription: Subscription;
  

  days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  constructor(
    private weatherService: WeatherService,
  ) { }

  ngOnInit() {
    this.weatherForcastSubscription =   this.weatherService.weeklyForcast.subscribe(data => {
      this.weeklyForcastData = data;

      this.weeklyForcastData.forEach(el => {
        el.day = this.days[el.day.getDay()];
      });

      this.weeklyForcastData.pop();
      this.weeklyForcastData.pop();
      this.weeklyForcastData.pop();
    });
  }

  ngOnDestroy() {
    this.weatherForcastSubscription ? this.weatherForcastSubscription.unsubscribe() : null;
  }


}
