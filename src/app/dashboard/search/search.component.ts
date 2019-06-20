import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { WeatherService } from 'src/app/services/weather.service';
import {  Subscription } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  searchWeatherSubscription;

  searchForm = new FormGroup({
    search:new FormControl('')
  })

  constructor(
    private weatherService: WeatherService
  ) { }

  ngOnInit() {

    


  }

  onSubmit() {

    let search =this.searchForm.value.search;
    this.searchWeatherSubscription = this.weatherService.getService(search).subscribe(data => {

      if (typeof data === 'string' ) {
        console.log('invalid ')
        this.searchWeatherSubscription.unsubscribe()
      }

      console.log('back from the service', data)
    })
   
  }


  ngOnDestroy() {
    this.searchWeatherSubscription ? this.searchWeatherSubscription.unsubscribe() : null;
  }

}
