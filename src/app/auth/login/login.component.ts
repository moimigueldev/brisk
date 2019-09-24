import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FirebaseAuthService } from 'src/app/services/firebase-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  })

  constructor(
    private fas: FirebaseAuthService,
    private router: Router
    ) { }

  ngOnInit() {
  }

  onSubmit() {
    this.fas.signIn(this.loginForm.value);
  }

  goToSignup() {
    this.router.navigate(['signup']);
  }

}
