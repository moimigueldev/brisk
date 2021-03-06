import { Component, OnInit} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { WeatherService } from 'src/app/services/weather.service';
import { ToastrService } from 'ngx-toastr';
import { CurrentWeather } from 'src/app/shared/interfaces/current-weather';
import { Subscription } from 'rxjs';
import { HighsLows } from 'src/app/shared/interfaces/highs-lows';
import { HumidityWind } from 'src/app/shared/interfaces/humidity-wind';
import { WeeklyForcast } from 'src/app/shared/interfaces/weekly-forcast';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { faMapMarkedAlt } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  faMapMarkedAlt = faMapMarkedAlt;

  searchWeatherSubscription: Subscription;

  searchForm = new FormGroup({
    search: new FormControl('')

  })

  constructor(
    private weatherService: WeatherService,
    private toastrService: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.route.children[0] ? this.onSubmit() : false;
  }



  onSubmit() {

    this.spinner.show();

    const search = this.searchForm.value.search ? this.searchForm.value.search : this.route.children[0].params['_value'].zipcode;
    this.searchWeatherSubscription = this.weatherService.getService(search).subscribe(data => {
      if (typeof data === 'string') {
        this.toastrService.error('Invalid Zipcode');
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
          dailyHighsLows.push({ date: new Date(el.time * 1000), high: el.temperatureHigh, low: el.temperatureLow, zipcode: search })
          dailyHumWind.push({ date: new Date(el.time * 1000), hum: el.humidity * 100, cloudCover: el.cloudCover * 100, zipcode: search })
          weeklyForcast.push({ day: new Date(el.time * 1000), summary: el.summary, tempHigh: el.apparentTemperatureHigh, icon: el.icon })
        });



        this.weatherService.emitWeather(
          todaysWeather,
          dailyHighsLows,
          dailyHumWind,
          weeklyForcast
        )



      }
    });//end of subscription


    this.searchForm.reset();

  }


  ngOnDestroy() {
    this.searchWeatherSubscription ? this.searchWeatherSubscription.unsubscribe() : null;
  }

}
