import { Component, OnInit } from '@angular/core';
import { WeatherService } from 'src/app/services/weather.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-weekly-forcast',
  templateUrl: './weekly-forcast.component.html',
  styleUrls: ['./weekly-forcast.component.scss']
})
export class WeeklyForcastComponent implements OnInit {

  days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  HighsLows = [];
  HighsLowsSubscription: Subscription;

  chartLabels;
  chartOptions = {
    responsive: true
  };
  chartDatasets;

  constructor(
    private weatherService: WeatherService
  ) { }

  ngOnInit() {
    this.HighsLowsSubscription =  this.weatherService.tempHighsLows.subscribe(data => {
      this.HighsLows = data;
      this.showGraph();
    })
  }

  showGraph() {
    let chartLabelsData = [];
    let highsDatasets = [];
    let lowDatasets = [];

    this.HighsLows.forEach(el => {
      
      chartLabelsData.push(this.days[el.date.getDay()]);
      highsDatasets.push(el.high);
      lowDatasets.push(el.low);
    });
    this.chartLabels = chartLabelsData;

    this.chartDatasets = [{
      label: 'Highs',
      fill: false,
      data: highsDatasets
    },
    {
      label: 'lows',
      fill: false,
      data: lowDatasets
    }];

  }

  ngOnDestroy() {
    this.HighsLowsSubscription? this.HighsLowsSubscription.unsubscribe() : null;
  }
}
 