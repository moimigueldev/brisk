import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { WeatherComponent } from './weather/weather.component';
import { TwitterComponent } from './twitter/twitter.component';
import { ForcastChartComponent } from './forcast-chart/forcast-chart.component';
import { SearchComponent } from './search/search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ChartsModule} from 'ng2-charts';
import { WeeklyForcastComponent } from './weekly-forcast/weekly-forcast.component';
import { SkyconsModule } from 'ngx-skycons';
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
    DashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ChartsModule,
    ToastrModule.forRoot(),
    SkyconsModule
  ]

})
export class DashboardModule { }
