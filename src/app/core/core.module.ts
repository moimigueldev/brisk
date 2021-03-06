import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './nav/nav.component';
import { RouterModule } from '@angular/router';
import { WeatherService } from '../services/weather.service';
import { HttpClientModule } from '@angular/common/http';
import { GetIPAdressService } from '../services/get-ipadress.service';
import { UserService } from '../services/user.service';
import { FirebaseModule } from './firebase.module';
import { FirebaseAuthService } from '../services/firebase-auth.service';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [NavComponent],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    FirebaseModule,
    SharedModule
  ],
  exports: [
    NavComponent
  ],
  providers: [
    WeatherService,
    GetIPAdressService,
    UserService,
    FirebaseAuthService
  ]
})
export class CoreModule { }
