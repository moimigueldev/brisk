import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ChartsModule } from 'ng2-charts';
import { SkyconsModule } from 'ngx-skycons';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    ChartsModule,
    SkyconsModule
  ],
  exports: [ChartsModule, SkyconsModule]
  
})
export class SharedModule { }
 