import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, tap, filter} from 'rxjs/operators';
import { WeatherService } from './weather.service';
import { CurrentWeather } from '../shared/interfaces/current-weather';
import { HighsLows } from '../shared/interfaces/highs-lows';
import { HumidityWind } from '../shared/interfaces/humidity-wind';
import { WeeklyForcast } from '../shared/interfaces/weekly-forcast';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GetIPAdressService {

  searchWeatherSubscription: Subscription;
  ipAdressURL = environment.IPURL;

  constructor(
    private http: HttpClient,
    private weatherService: WeatherService,
    private toastrService: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

 
  getIpAddressService() {

    

    console.log('getting Ip address')
    return this.http.get(this.ipAdressURL).subscribe(data => {
      console.log('data', Number(data['postal_code']))

      this.searchWeatherSubscription = this.weatherService.getService(data['postal_code']).subscribe(data => {
        if (typeof data === 'string') {
          this.toastrService.error('Invalid Zipcode');
          this.searchWeatherSubscription.unsubscribe()
        } 
        else {
  
        //TODAYSWEATHER  
        const todaysWeather: CurrentWeather = {
          lat: data['latitude'],
          lon: data['longitude'],
          temp: data['currently'].temperature,
          summary: data['currently'].summary,
          icon: data['currently'].icon,
          windSpeed: data['currently'].windSpeed,
          humidity: data['currently'].humidity,
          time: data['currently'].time
        }
        
        //HIGHLOWS CHART
        let dailyHighsLows: HighsLows[] = []
        //HUMIDITYWIND
        let dailyHumWind: HumidityWind[] = []
        //WEEKLYFORCAST
        let weeklyForcast: WeeklyForcast[] = [];
  
        data['daily'].data.forEach(el => {
          dailyHighsLows.push({date: new Date(el.time * 1000), high: el.temperatureHigh, low: el.temperatureLow })
          dailyHumWind.push({date: new Date(el.time * 1000), hum: el.humidity * 100, cloudCover: el.cloudCover * 100 })
          weeklyForcast.push({day: new Date(el.time * 1000) ,summary: el.summary, tempHigh: el.apparentTemperatureHigh, icon: el.icon })
        });
  
  
  
  
        this.weatherService.emitWeather(
          todaysWeather, 
          dailyHighsLows, 
          dailyHumWind,
          weeklyForcast
          )
        }
      }) 
    })
    
    

  }//end of getIpAdressService()


  ngOnDestroy() {
    this.searchWeatherSubscription ? this.searchWeatherSubscription.unsubscribe() : null;
  }



}
