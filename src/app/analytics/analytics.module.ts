import { TrackformModalComponent } from '../modals/trackformModal.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AnalyticsRoutingModule } from "./analytics-routing.module";
import { AnalyticsHomeComponent } from "./analytics-home/analytics-home.component";
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { CustomOption } from "../common/customoption";
import { ToastOptions } from 'ng2-toastr';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  imports: [
    CommonModule, FormsModule,
    AnalyticsRoutingModule, ChartsModule, ToastModule.forRoot(), NgbModule.forRoot()
  ],
  declarations: [AnalyticsHomeComponent,  TrackformModalComponent],
  providers: [
    {provide: ToastOptions, useClass: CustomOption},
  ],
  entryComponents: [TrackformModalComponent],
})
export class AnalyticsModule { }
