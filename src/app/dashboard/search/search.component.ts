import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { WeatherService } from 'src/app/services/weather.service';
import { ToastrService } from 'ngx-toastr';
import { CurrentWeather } from 'src/app/shared/interfaces/current-weather';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  searchWeatherSubscription: Subscription;

 

  searchForm = new FormGroup({
    search: new FormControl('')

  })

  constructor(
    private weatherService: WeatherService,
    private toastrService: ToastrService
  ) { }

  ngOnInit() {




  }



  onSubmit() {

    let search = this.searchForm.value.search;
    this.searchWeatherSubscription = this.weatherService.getService(search).subscribe(data => {

      if (typeof data === 'string') {
        this.toastrService.error('Invalid Zipcode');
        this.searchWeatherSubscription.unsubscribe()
      }



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

     


      this.weatherService.emitWeather(todaysWeather)

    })
    this.searchForm.reset();
  }


  ngOnDestroy() {
    this.searchWeatherSubscription ? this.searchWeatherSubscription.unsubscribe() : null;
  }

}
