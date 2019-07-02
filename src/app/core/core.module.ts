import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './nav/nav.component';
import { RouterModule } from '@angular/router';
import { WeatherService } from '../services/weather.service';
import { HttpClientModule } from '@angular/common/http';
import { GetIPAdressService } from '../services/get-ipadress.service';
import { UserService } from '../services/user.service';

@NgModule({
  declarations: [NavComponent],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
  ],
  exports: [
    NavComponent
  ],
  providers: [
    WeatherService,
    GetIPAdressService,
    UserService
  ]
})
export class CoreModule { }
