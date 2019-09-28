import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WeatherService } from './weather.service';
import { CurrentWeather } from '../shared/interfaces/current-weather';
import { HighsLows } from '../shared/interfaces/highs-lows';
import { HumidityWind } from '../shared/interfaces/humidity-wind';
import { WeeklyForcast } from '../shared/interfaces/weekly-forcast';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute } from '@angular/router';

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
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute
  ) { }
 
 
  getIpAddressService() {
    console.log('data',this.route.children[0].children.length)

    if (this.route.children[0].children.length === 1) {
      return null;
    } else {

    

    this.spinner.show();
    return this.http.get(this.ipAdressURL).subscribe(data => {
      this.searchWeatherSubscription = this.weatherService.getService(data['postal_code']).subscribe(data => {
        if (typeof data === 'string') {
          this.toastrService.error('Invalid Zipcode');
          this.spinner.hide();
          this.searchWeatherSubscription.unsubscribe();
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
          dailyHighsLows.push({date: new Date(el.time * 1000), high: el.temperatureHigh, low: el.temperatureLow, zipcode: data['postal_code'] })
          dailyHumWind.push({date: new Date(el.time * 1000), hum: el.humidity * 100, cloudCover: el.cloudCover * 100, zipcode: data['postal_code'] })
          weeklyForcast.push({day: new Date(el.time * 1000) ,summary: el.summary, tempHigh: el.apparentTemperatureHigh, icon: el.icon })
        });
  
        this.weatherService.emitWeather(
          todaysWeather,
          dailyHighsLows,
          dailyHumWind,
          weeklyForcast
          );
        }
      });
    });

  }
  }//end of getIpAdressService()


  ngOnDestroy() {
    this.searchWeatherSubscription ? this.searchWeatherSubscription.unsubscribe() : null;
  }

}
