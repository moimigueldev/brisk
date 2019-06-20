import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {mergeMap, map, switchMap} from 'rxjs/operators'
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  googleMapsKey = environment.googleMapsGeocodeKey;
  darkSkyKey = environment.darkSkyKey;

  constructor(
    private http: HttpClient
  ) { }

  getService(zipcode: number) {
    if (zipcode) {
       return this.http.get(`/maps/api/geocode/json?address=${zipcode}&key=${this.googleMapsKey}`).pipe(
        switchMap(googleData => {

          if (googleData.status === "ZERO_RESULTS") {
            return 'invalid'
          }else {

          let coordinates = {
            lat: googleData.results[0].geometry.location.lat,
            lon: googleData.results[0].geometry.location.lng
          }
          return this.http.get(`/forecast/${this.darkSkyKey}/${coordinates.lat},${coordinates.lon}`)
        }
        })
       )
    }//end of if
  }//end of getService()
}
