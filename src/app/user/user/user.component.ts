import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';


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


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit() {

    this.cities = this.userService.getCities()
    
    console.log('cities', this.cities)

  }

  onSubmit() {
    let search = this.searchForm.value.search;

    this.router.navigate([`/dashboard/${search}`])

  }

}
