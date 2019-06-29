import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  searchForm = new FormGroup({
    search: new FormControl('')

  })


  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {

    
   

  }

  onSubmit() {
    let search = this.searchForm.value.search;

    this.router.navigate([`/dashboard/${search}`])

  }

}
