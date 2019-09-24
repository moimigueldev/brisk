import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ChartsModule } from 'ng2-charts';
import { SkyconsModule } from 'ngx-skycons';
import { NgxSpinnerModule } from 'ngx-spinner';
import {AngularFontAwesomeModule} from 'angular-font-awesome';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    ChartsModule,
    SkyconsModule,
    NgxSpinnerModule,
    AngularFontAwesomeModule
  ],
  exports: [ChartsModule, SkyconsModule, NgxSpinnerModule, AngularFontAwesomeModule]
  
})
export class SharedModule { }
 