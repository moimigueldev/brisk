import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { FirebaseAuthService } from 'src/app/services/firebase-auth.service';
import { Subscription } from 'rxjs';
import { Location } from 'src/app/shared/interfaces/location';
import { WeatherService } from 'src/app/services/weather.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  searchForm = new FormGroup({
    search: new FormControl('')

  })

  cities = [];

  userSubscription: Subscription;


  user;



  constructor(
    private router: Router,
    private fas: FirebaseAuthService,

  ) { }

  ngOnInit() {
    this.userSubscription = this.fas.getUserData().subscribe(res => {
      this.cities = res['cities'];
      this.user = res;
      console.log(this.user);
      
    });
  }

  onSubmit() {
    const search = this.searchForm.value.search;

    this.router.navigate([`/dashboard/${search}`]);

  }

  // tslint:disable-next-line: use-life-cycle-interface
  ngOnDestroy() {
    this.userSubscription ? this.userSubscription.unsubscribe() : null;
  }

}
