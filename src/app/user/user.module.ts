import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user/user.component';
import { DashboardModule } from '../dashboard/dashboard.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    UserComponent,
    
  ],
  imports: [
    CommonModule,
    DashboardModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class UserModule { }
