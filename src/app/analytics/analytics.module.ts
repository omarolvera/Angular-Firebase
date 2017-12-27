import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AnalyticsRoutingModule } from "./analytics-routing.module";
import { AnalyticsHomeComponent } from "./analytics-home/analytics-home.component";
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { CustomOption } from "../common/customoption";
import {ToastOptions} from 'ng2-toastr';
import { TrackformComponent } from './trackform/trackform.component';

@NgModule({
  imports: [
    CommonModule, FormsModule,
    AnalyticsRoutingModule, ChartsModule, ToastModule.forRoot()
  ],
  declarations: [AnalyticsHomeComponent, TrackformComponent],
  providers: [ 
    {provide: ToastOptions, useClass: CustomOption},
  
  ]
})
export class AnalyticsModule { }
