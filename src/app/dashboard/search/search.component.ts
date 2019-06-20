import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { WeatherService } from 'src/app/services/weather.service';
import { ToastrService } from 'ngx-toastr';
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
    private weatherService: WeatherService,
    private toastrService: ToastrService
  ) { }

  ngOnInit() {

    
    

  }

  onSubmit() {

    let search =this.searchForm.value.search;
    this.searchWeatherSubscription = this.weatherService.getService(search).subscribe(data => {

      if (typeof data === 'string' ) {
        this.toastrService.error('Invalid Zipcode');
        this.searchWeatherSubscription.unsubscribe()
      }

      console.log('back from the service', data)
    })
   
    
   

    this.searchForm.reset();
  }


  ngOnDestroy() {
    this.searchWeatherSubscription ? this.searchWeatherSubscription.unsubscribe() : null;
  }

}
