import { Component, OnInit } from '@angular/core';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-weekly-forcast',
  templateUrl: './weekly-forcast.component.html',
  styleUrls: ['./weekly-forcast.component.scss']
})
export class WeeklyForcastComponent implements OnInit {

  weeklyForcastData = [];

  days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  constructor(
    private weatherService: WeatherService
  ) { }

  ngOnInit() {
    this.weatherService.weeklyForcast.subscribe(data => {
      this.weeklyForcastData = data;
      this.weeklyForcastData.pop();
      this.weeklyForcastData.pop();
      this.weeklyForcastData.pop();

      let daysData = [];
      
  
      this.weeklyForcastData.forEach(el => {
        el.day = this.days[el.day.getDay()];
      }); 

      console.log(this.weeklyForcastData)

    });
    
  }

}
