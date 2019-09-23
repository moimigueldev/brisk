import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { FirebaseAuthService } from 'src/app/services/firebase-auth.service';
import { Subscription } from 'rxjs';


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
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private fas: FirebaseAuthService
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

  // tslint:disable-next-line: use-life-cycle-interface
  ngOnDestroy() {
    this.userSubscription ? this.userSubscription.unsubscribe() : null;
  }

}
