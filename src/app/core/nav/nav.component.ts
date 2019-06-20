import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  today: number = Date.now();
  

  constructor() { }

  ngOnInit() {
    console.log(this.today)
  }

}
 