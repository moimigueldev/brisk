import { Component, OnInit } from '@angular/core';
import { GetIPAdressService } from 'src/app/services/get-ipadress.service';
import { FirebaseAuthService } from 'src/app/services/firebase-auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private getIpService: GetIPAdressService,
    private fas: FirebaseAuthService
  ) { }

  ngOnInit() {
    // this.getIpService.getIpAddressService();

    
  } 

}
 