import { Component, OnInit} from '@angular/core';
import { WeatherService } from 'src/app/services/weather.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {

  locationSubscription: Subscription;
  currentWeatherSubscription: Subscription;
  location;
  todaysWeather;


  constructor(
    private weatherService: WeatherService,
  ) { }

  ngOnInit() {
   this.locationSubscription =  this.weatherService.weather.subscribe(data =>{
    this.todaysWeather = data;    
   })
   this.currentWeatherSubscription =  this.weatherService.location.subscribe(data =>{
     this.location = data;
   });
  }

  ngOnDestroy() {
    this.locationSubscription ? this.locationSubscription.unsubscribe() : null;
    this.currentWeatherSubscription ? this.currentWeatherSubscription.unsubscribe() : null;
  }

}
 