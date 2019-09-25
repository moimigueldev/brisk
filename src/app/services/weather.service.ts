import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {switchMap} from 'rxjs/operators'
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import {Location} from '../shared/interfaces/location';
import { CurrentWeather } from '../shared/interfaces/current-weather';
import { HighsLows } from '../shared/interfaces/highs-lows';
import { HumidityWind } from '../shared/interfaces/humidity-wind';
import { WeeklyForcast } from '../shared/interfaces/weekly-forcast';
import { NgxSpinnerService } from 'ngx-spinner';


@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  googleMapsKey = environment.googleMapsGeocodeKey;
  darkSkyKey = environment.darkSkyKey;

  weather = new Subject();
  location = new Subject<Location>();
  tempHighsLows = new Subject<HighsLows[]>();
  humidityWind = new Subject<HumidityWind[]>();
  weeklyForcast = new Subject<WeeklyForcast[]>();

  locationToSave: Location;


 
  constructor(
    private http: HttpClient,
    private spinner: NgxSpinnerService
  ) { } 

  getService(zipcode: number) {
    if (zipcode) {
       return this.http.get(`/maps/api/geocode/json?address=${zipcode}&key=${this.googleMapsKey}`).pipe(
        switchMap(res => {
          

          if (res['status'] === "ZERO_RESULTS" || res['results']["0"].address_components.length <= 1 ) {
            this.spinner.hide();
            return 'invalid';
          } else {

          let location: Location = {
            city: res['results']["0"].address_components[1].long_name,
            state: res['results']["0"].address_components[2].short_name
          };

          this.locationToSave = location;
          this.location.next(location);

          let coordinates = {
            lat: res['results'][0].geometry.location.lat,
            lon: res['results'][0].geometry.location.lng
          };

          return this.http.get(`/forecast/${this.darkSkyKey}/${coordinates.lat},${coordinates.lon}`)
        }
        })
        
       )
    }//end of if
  }//end of getService()




  emitWeather(
    todaysWeather: CurrentWeather,
    dailyHighsLows: HighsLows[],
    dailyHumWind: HumidityWind[],
    weeklyForcast: WeeklyForcast[],
    
    ) {

    this.spinner.hide();

    this.weather.next(todaysWeather);
    this.tempHighsLows.next(dailyHighsLows);
    this.humidityWind.next(dailyHumWind);
    this.weeklyForcast.next(weeklyForcast);
  }

  getServiceOnInit(zipcode: number) {

    if (zipcode) {
       return this.http.get(`/maps/api/geocode/json?address=${zipcode}&key=${this.googleMapsKey}`).pipe(
        switchMap(res => {

          if (res['status'] === "ZERO_RESULTS") {
            return 'invalid'
          }else {
          
 

          let location: Location = {
            city: res['results']["0"].address_components[1].long_name,
            state: res['results']["0"].address_components[2].short_name
          }

           this.location.next(location) 

          let coordinates = {
            lat: res['results'][0].geometry.location.lat,
            lon: res['results'][0].geometry.location.lng
          }

          return this.http.get(`/forecast/${this.darkSkyKey}/${coordinates.lat},${coordinates.lon}`)
        }
        })
        
       )
    }//end of if
  }//end of getService()


}
