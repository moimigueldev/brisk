import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {switchMap} from 'rxjs/operators'
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import {Location} from '../shared/interfaces/location';
import { CurrentWeather } from '../shared/interfaces/current-weather';


@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  googleMapsKey = environment.googleMapsGeocodeKey;
  darkSkyKey = environment.darkSkyKey;

  weather = new Subject();
  location = new Subject<Location>();



  constructor(
    private http: HttpClient
  ) { } 

  getService(zipcode: number) {
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


  emitWeather(todaysWeather: CurrentWeather) {
    this.weather.next(todaysWeather)
  }



}
