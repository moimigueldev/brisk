import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './nav/nav.component';
import { RouterModule } from '@angular/router';
import { WeatherService } from '../services/weather.service';
import { HttpClientModule } from '@angular/common/http';
import { GetIPAdressService } from '../services/get-ipadress.service';
import { UserService } from '../services/user.service';
import { FirebaseModule } from './firebase.module';

@NgModule({
  declarations: [NavComponent],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    FirebaseModule,
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
