import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {Router } from '@angular/router';
import { FirebaseAuthService } from 'src/app/services/firebase-auth.service';
import { Subscription } from 'rxjs';
import {faMapMarkedAlt, faEye, faTrashAlt} from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  // ICONS
  faMapMarkedAlt = faMapMarkedAlt;
  faEye = faEye;
  faTrashAlt = faTrashAlt;

  searchForm = new FormGroup({
    search: new FormControl('')

  });

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
    });
  }

  onSubmit() {
    const search = this.searchForm.value.search;
    this.router.navigate([`/dashboard/${search}`]);
  }

  onDeleteCity(index) {
    this.fas.deleteCity(index);
  }

  onView(index) {
    // take the user to the selected zipcode
    this.router.navigate([`/dashboard/${this.cities[index].postal}`]);
  }

  // tslint:disable-next-line: use-life-cycle-interface
  ngOnDestroy() {
    this.userSubscription ? this.userSubscription.unsubscribe() : null;
  }

}
