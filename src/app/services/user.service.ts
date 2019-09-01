import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  cities = [
    {
      zipcode: 55044, 
      state: 'MN',
      city: 'Lakeville',
      summary: 'Cloudy, Rainy through out the day',
      temp: 40
    },
    {
      zipcode: 55044, 
      state: 'MN',
      city: 'Lakeville',
      summary: 'Cloudy, Rainy through out the day',
      temp: 40
    },
    {
      zipcode: 55044, 
      state: 'MN',
      city: 'Lakeville',
      summary: 'Cloudy, Rainy through out the day',
      temp: 40
    },
    {
      zipcode: 55044, 
      state: 'MN',
      city: 'Lakeville',
      summary: 'Cloudy, Rainy through out the day',
      temp: 40
    }
  ]

  constructor(
     
  ) { }



  getCities() {
    return this.cities;
  }



}
