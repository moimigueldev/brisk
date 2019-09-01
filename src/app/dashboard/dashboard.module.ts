import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { WeatherComponent } from './weather/weather.component';
import { TwitterComponent } from './twitter/twitter.component';
import { ForcastChartComponent } from './forcast-chart/forcast-chart.component';
import { SearchComponent } from './search/search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WeeklyForcastComponent } from './weekly-forcast/weekly-forcast.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    DashboardComponent,
    WeatherComponent,
    TwitterComponent,
    ForcastChartComponent,
    SearchComponent,
    WeeklyForcastComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    SearchComponent
  ]

})
export class DashboardModule { }
