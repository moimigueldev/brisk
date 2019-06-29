import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { UserModule } from './user/user.module';
import { WeatherCardComponent } from './user/weather-card/weather-card.component';



@NgModule({
  declarations: [
    AppComponent,
    WeatherCardComponent,
  ],
  imports: [
    BrowserModule,
    CoreModule,
    AppRoutingModule,
    AuthModule,
    DashboardModule,
    UserModule
     
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
