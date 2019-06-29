import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { UserComponent } from './user/user/user.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';


const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component:LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'user', component:UserComponent},
  {path:'dashboard', component:DashboardComponent, children:[
    {path: ':zipcode', component:DashboardComponent}
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
