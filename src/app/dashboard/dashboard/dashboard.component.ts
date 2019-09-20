import { Component, OnInit } from '@angular/core';
import { GetIPAdressService } from 'src/app/services/get-ipadress.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(

  private getIpService: GetIPAdressService
  ) { }

  ngOnInit() {
    // this.getIpService.getIpAddressService();
   
    
  } 

}
 