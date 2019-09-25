import { Component, OnInit, OnChanges, DoCheck, AfterContentInit, AfterViewChecked, AfterContentChecked} from '@angular/core';
import { WeatherService } from 'src/app/services/weather.service';
import { Subscription } from 'rxjs';
import { faFan, faTint } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {

  faFan = faFan;
  faTint = faTint;

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
      // (document.querySelector('.weather-icons.skycons__canvas') as HTMLCanvasElement).style.width = 'inherit';
    });
    this.currentWeatherSubscription =  this.weatherService.location.subscribe(data =>{
      this.location = data;
    });
  }

  ngOnDestroy() {
    this.locationSubscription ? this.locationSubscription.unsubscribe() : null;
    this.currentWeatherSubscription ? this.currentWeatherSubscription.unsubscribe() : null;
  }

}
 