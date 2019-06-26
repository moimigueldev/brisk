import { Component, OnInit } from '@angular/core';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-twitter',
  templateUrl: './twitter.component.html',
  styleUrls: ['./twitter.component.scss']
})
export class TwitterComponent implements OnInit {
  
  days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  humWindData = [];
  chartOptions = {
    responsive: true
  }; 
  chartDatasets = [];
  chartLabels = [];

  constructor(
    private weatherService: WeatherService
  ) { }

  ngOnInit() {
    this.weatherService.humidityWind.subscribe(data => {
      
      this.humWindData = data;
      this.showGraph();
    })
  }

  showGraph() {
    
    

    let daysData = [];
    let humData = [];
    let cloudCover = [];

    this.humWindData.forEach(el => {
      daysData.push(this.days[el.date.getDay()]);
      humData.push(el.hum);
      cloudCover.push(el.cloudCover)
    });


    this.chartDatasets = [
      { data: humData, label: 'Humidity' },
      { data: cloudCover, label: 'Cloud Cover' },
      
    ];
  
    this.chartLabels = daysData;

  }

 


}
