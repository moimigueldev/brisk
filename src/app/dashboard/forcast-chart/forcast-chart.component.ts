import { Component, OnInit } from '@angular/core';
import { WeatherService } from 'src/app/services/weather.service';
import { Subscription } from 'rxjs';
import { FirebaseAuthService } from 'src/app/services/firebase-auth.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-forcast-chart',
  templateUrl: './forcast-chart.component.html',
  styleUrls: ['./forcast-chart.component.scss']
})
export class ForcastChartComponent implements OnInit {

  days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  HighsLows = [];
  HighsLowsSubscription: Subscription;

  chartLabels;
  chartOptions = {
    responsive: true
  };
  chartDatasets;

  constructor(
    private weatherService: WeatherService,
    private fas: FirebaseAuthService,
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

  saveCity() {
    this.fas.addZipcode(this.HighsLows[0].zipcode);
  }

  ngOnDestroy() {
    this.HighsLowsSubscription? this.HighsLowsSubscription.unsubscribe() : null;
  }
}
 