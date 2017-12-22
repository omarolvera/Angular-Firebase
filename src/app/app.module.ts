import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from "./app-routing.module";
import { DashboardComponent } from './dashboard/dashboard.component';
import { TrackApiService } from "./shared/track-api.service";
import { ChartsModule } from 'ng2-charts/ng2-charts';
  import {ToastModule} from 'ng2-toastr/ng2-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  imports: [BrowserModule, FormsModule, BrowserAnimationsModule,
    AppRoutingModule, HttpClientModule, ChartsModule,ToastModule.forRoot()

  ],
  declarations: [AppComponent, DashboardComponent],
  providers: [
    TrackApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
